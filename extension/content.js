// Lotus Exporter — content script
// Detects platform, extracts conversation messages, responds to popup

const PLATFORM_MAP = {
  'claude.ai': 'claude',
  'chatgpt.com': 'chatgpt',
  'chat.openai.com': 'chatgpt',
  'gemini.google.com': 'gemini',
  'grok.com': 'grok',
  'x.com': 'grok',
  'kimi.moonshot.cn': 'kimi',
  'kimi.ai': 'kimi',
  'meta.ai': 'metaai',
  'www.meta.ai': 'metaai',
  'cursor.com': 'cursor',
};

function detectPlatform() {
  const host = location.hostname.replace(/^www\./, '');
  return PLATFORM_MAP[host] || null;
}

function getConversationId(platform) {
  const path = location.pathname;
  const patterns = {
    claude:   [/\/(chat|share)\/([a-zA-Z0-9_-]+)/, 2],
    chatgpt:  [/\/c\/([a-zA-Z0-9_-]+)/, 1],
    gemini:   [/\/app\/([a-zA-Z0-9_-]+)/, 1],
    grok:     [/\/(?:chat|grok)\/([a-zA-Z0-9_-]+)/, 1],
    kimi:     [/\/chat\/([a-zA-Z0-9_-]+)/, 1],
    metaai:   [/\/(?:chat\/)?([a-zA-Z0-9_-]{8,})/, 1],
    cursor:   [/\/chat\/([a-zA-Z0-9_-]+)/, 1],
  };
  const entry = patterns[platform];
  if (!entry) return 'unknown';
  const m = path.match(entry[0]);
  return m ? m[entry[1]] : path.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'unknown';
}

function isClaudeSharePage() {
  return location.hostname === 'claude.ai' && location.pathname.startsWith('/share/');
}

function getPageTitle() {
  return (
    document.querySelector('h1')?.innerText?.trim() ||
    document.title?.replace(/ ?[|–-].*$/, '').trim() ||
    'Untitled Chat'
  );
}

// ── Scrapers ──────────────────────────────────────────────────────────────────

function scrapeClaude() {
  const msgs = [];

  // Claude's DOM uses data-testid on turn wrappers; share pages use a clean reader layout
  const turnSelectors = [
    '[data-testid="human-turn"]',
    '[data-testid="ai-turn"]',
    '[data-testid="user-turn"]',
    '[data-testid="assistant-turn"]',
  ];

  // Collect all turns ordered by DOM position
  const allTurns = [
    ...document.querySelectorAll(turnSelectors.join(', ')),
  ].sort((a, b) => a.compareDocumentPosition(b) & 4 ? -1 : 1);

  if (allTurns.length > 0) {
    allTurns.forEach((el, i) => {
      const tid = el.dataset.testid || '';
      const isUser = tid.includes('human') || tid.includes('user');
      msgs.push({
        id: `turn-${i}`,
        role: isUser ? 'user' : 'assistant',
        content: el.innerText.trim(),
      });
    });
    return msgs;
  }

  // Fallback A — claude share pages use a read-only article layout
  const articles = document.querySelectorAll('article, [class*="message"], [class*="Message"]');
  if (articles.length > 0) {
    articles.forEach((el, i) => {
      if (el.closest('nav, header, footer, aside')) return;
      const cls = (el.className || '') + (el.getAttribute('data-type') || '');
      const isUser = /human|user|prompt/i.test(cls);
      msgs.push({ id: `art-${i}`, role: isUser ? 'user' : 'assistant', content: el.innerText.trim() });
    });
    return msgs;
  }

  // Fallback B — prose blocks in DOM order (share page reader)
  const proseBlocks = document.querySelectorAll('.prose, [class*="prose"]');
  proseBlocks.forEach((el, i) => {
    if (el.closest('nav, header, footer')) return;
    msgs.push({ id: `prose-${i}`, role: i % 2 === 0 ? 'user' : 'assistant', content: el.innerText.trim() });
  });

  return msgs;
}

function scrapeChatGPT() {
  const msgs = [];

  // Primary: data-message-author-role attribute (stable since ~2023)
  const byRole = document.querySelectorAll('[data-message-author-role]');
  if (byRole.length > 0) {
    byRole.forEach(el => {
      const role = el.getAttribute('data-message-author-role'); // "user" | "assistant" | "tool"
      if (role === 'tool') return; // skip tool call outputs
      const nativeId = el.getAttribute('data-message-id');
      const contentEl = el.querySelector('.markdown, .prose, [class*="markdown"], [class*="prose"]') || el;
      msgs.push({
        id: nativeId || `chatgpt-${msgs.length}`,
        role: role === 'assistant' ? 'assistant' : 'user',
        content: contentEl.innerText.trim(),
      });
    });
    return msgs;
  }

  // Fallback: article conversation-turn elements
  document.querySelectorAll('article[data-testid^="conversation-turn"]').forEach((art, i) => {
    const roleEl = art.querySelector('[data-message-author-role]');
    const role = roleEl?.getAttribute('data-message-author-role') || (i % 2 === 0 ? 'user' : 'assistant');
    const nativeId = roleEl?.getAttribute('data-message-id') || `art-${i}`;
    msgs.push({ id: nativeId, role, content: art.innerText.trim() });
  });

  return msgs;
}

function scrapeGemini() {
  const msgs = [];

  // Gemini uses web components: user-query and model-response
  const all = document.querySelectorAll(
    'user-query, model-response, [class*="user-query"], [class*="model-response"], ' +
    '[class*="UserQuery"], [class*="ModelResponse"]'
  );

  if (all.length > 0) {
    all.forEach((el, i) => {
      const tag = el.tagName.toLowerCase();
      const cls = el.className || '';
      const isUser = tag === 'user-query' || /user.?query|UserQuery/i.test(cls);
      const contentEl =
        el.querySelector('[class*="query-text"], [class*="response-text"], .markdown, p') || el;
      msgs.push({ id: `gem-${i}`, role: isUser ? 'user' : 'assistant', content: contentEl.innerText.trim() });
    });
    return msgs;
  }

  // Fallback: message-content wrappers
  document.querySelectorAll('[class*="message-content"], message-content').forEach((el, i) => {
    msgs.push({ id: `gem-${i}`, role: i % 2 === 0 ? 'user' : 'assistant', content: el.innerText.trim() });
  });

  return msgs;
}

function scrapeGrok() {
  const msgs = [];

  // Grok on x.com / grok.com
  // Look for data-message-id first (Grok's API embeds IDs into DOM)
  const byId = document.querySelectorAll('[data-message-id]');
  if (byId.length > 0) {
    byId.forEach(el => {
      const id = el.getAttribute('data-message-id');
      const isUser = /user|human|outgoing/i.test(el.className + (el.getAttribute('data-role') || ''));
      msgs.push({ id, role: isUser ? 'user' : 'assistant', content: el.innerText.trim() });
    });
    return msgs;
  }

  // Grok typically alternates in a conversation list
  const candidates = document.querySelectorAll(
    '[class*="message-bubble"], [class*="MessageBubble"], ' +
    '[class*="chat-message"], [class*="ChatMessage"], ' +
    '[class*="conversation-turn"], [class*="ConversationTurn"]'
  );
  candidates.forEach((el, i) => {
    if (el.closest('[class*="message-bubble"], [class*="MessageBubble"]') !== el) return;
    const cls = el.className || '';
    const isUser = /user|human|outgoing/i.test(cls);
    msgs.push({ id: `grok-${i}`, role: isUser ? 'user' : 'assistant', content: el.innerText.trim() });
  });

  if (msgs.length > 0) return msgs;

  // Last resort: find a scroll container and grab direct children
  const container = document.querySelector(
    '[class*="conversation"], [class*="Conversation"], [class*="chat-body"], [class*="ChatBody"]'
  );
  if (container) {
    [...container.children].forEach((el, i) => {
      msgs.push({ id: `grok-${i}`, role: i % 2 === 0 ? 'user' : 'assistant', content: el.innerText.trim() });
    });
  }

  return msgs;
}

function scrapeKimi() {
  const msgs = [];

  const items = document.querySelectorAll(
    '[class*="message-item"], [class*="MessageItem"], ' +
    '[class*="chat-item"], [class*="ChatItem"], ' +
    '[class*="msg-item"], [class*="MsgItem"]'
  );

  items.forEach((el, i) => {
    if (el.closest('[class*="message-item"], [class*="MessageItem"], [class*="chat-item"], [class*="ChatItem"]') !== el) return;
    const cls = el.className || '';
    const isUser = /user|human|mine|right|outgoing/i.test(cls)
      || el.querySelector('[class*="user-avatar"], [class*="UserAvatar"]') !== null;
    const contentEl = el.querySelector('[class*="message-content"], [class*="MessageContent"], .markdown, p') || el;
    msgs.push({ id: `kimi-${i}`, role: isUser ? 'user' : 'assistant', content: contentEl.innerText.trim() });
  });

  return msgs;
}

function scrapeMetaAI() {
  const msgs = [];

  // Meta AI uses a Facebook-style DOM
  const candidates = document.querySelectorAll(
    '[data-testid*="message"], [class*="message-row"], [class*="MessageRow"], ' +
    '[class*="chat-bubble"], [class*="ChatBubble"]'
  );

  candidates.forEach((el, i) => {
    // Skip nested matches — only top-level containers
    const parent = el.parentElement?.closest(
      '[data-testid*="message"], [class*="message-row"], [class*="chat-bubble"]'
    );
    if (parent) return;

    const tid = el.getAttribute('data-testid') || '';
    const cls = el.className || '';
    const isUser = /user|outgoing|sent|human/i.test(tid + cls)
      || el.querySelector('[class*="outgoing"], [class*="sent"]') !== null;
    msgs.push({ id: `metaai-${i}`, role: isUser ? 'user' : 'assistant', content: el.innerText.trim() });
  });

  return msgs;
}

function scrapeCursor() {
  const msgs = [];

  // Cursor's web chat (if available at cursor.com/chat or similar)
  const byRole = document.querySelectorAll('[data-role]');
  if (byRole.length > 0) {
    byRole.forEach((el, i) => {
      const role = el.getAttribute('data-role');
      msgs.push({ id: `cursor-${i}`, role: role === 'user' ? 'user' : 'assistant', content: el.innerText.trim() });
    });
    return msgs;
  }

  document.querySelectorAll('[class*="message"], [class*="Message"]').forEach((el, i) => {
    if (el.closest('[class*="message"]') !== el) return;
    const cls = el.className || '';
    const isUser = /user|human|prompt/i.test(cls);
    msgs.push({ id: `cursor-${i}`, role: isUser ? 'user' : 'assistant', content: el.innerText.trim() });
  });

  return msgs;
}

const SCRAPERS = {
  claude: scrapeClaude,
  chatgpt: scrapeChatGPT,
  gemini: scrapeGemini,
  grok: scrapeGrok,
  kimi: scrapeKimi,
  metaai: scrapeMetaAI,
  cursor: scrapeCursor,
};

// ── Message listener ──────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  const platform = detectPlatform();
  const convId = platform ? getConversationId(platform) : null;

  if (msg.type === 'GET_STATUS') {
    sendResponse({
      platform,
      convId,
      url: location.href,
      title: getPageTitle(),
      isClaudeShare: platform === 'claude' ? isClaudeSharePage() : null,
      messageCount: platform ? (SCRAPERS[platform]?.() || []).length : 0,
    });
    return true;
  }

  if (msg.type === 'EXTRACT') {
    if (!platform) {
      sendResponse({ error: 'Platform not recognized' });
      return true;
    }
    const scraper = SCRAPERS[platform];
    if (!scraper) {
      sendResponse({ error: `No scraper for platform: ${platform}` });
      return true;
    }

    const messages = scraper().filter(m => m.content.length > 2);
    sendResponse({
      platform,
      convId,
      title: getPageTitle(),
      url: location.href,
      messages,
      extractedAt: new Date().toISOString(),
    });
    return true;
  }
});
