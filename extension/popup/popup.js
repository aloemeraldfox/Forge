// Lotus Exporter — popup script

const PLATFORM_LABELS = {
  claude:  'Claude',
  chatgpt: 'ChatGPT',
  gemini:  'Gemini',
  grok:    'Grok',
  kimi:    'Kimi',
  metaai:  'Meta AI',
  cursor:  'Cursor',
};

const PLATFORM_COLORS = {
  claude:  { fg: '#e8875d', bg: 'rgba(232,135,93,0.15)' },
  chatgpt: { fg: '#74c99a', bg: 'rgba(116,201,154,0.15)' },
  gemini:  { fg: '#5b8ef4', bg: 'rgba(91,142,244,0.15)' },
  grok:    { fg: '#60c0e8', bg: 'rgba(96,192,232,0.15)' },
  kimi:    { fg: '#9c7ee8', bg: 'rgba(156,126,232,0.15)' },
  metaai:  { fg: '#4a9ef4', bg: 'rgba(74,158,244,0.15)' },
  cursor:  { fg: '#3eb8c8', bg: 'rgba(62,184,200,0.15)' },
};

const PLATFORM_TIPS = {
  claude: {
    regular: '⚠ For a complete export, tap Share → Create public link, then open that link and export from there.',
    share:   '✓ Share page — full conversation is visible.',
  },
  chatgpt: 'Scroll to the top of the chat to load all messages before exporting.',
  gemini:  'Scroll to the top of the chat to load all messages before exporting.',
  grok:    'Scroll to the top of the chat to load all messages before exporting.',
  kimi:    'Scroll to the top of the chat to load all messages before exporting.',
  metaai:  'Scroll to the top of the chat to load all messages before exporting.',
  cursor:  'Scroll to the top of the chat to load all messages before exporting.',
};

// ── Storage helpers ────────────────────────────────────────────────────────────

const storageKey = (platform, convId) => `exported:${platform}:${convId}`;

async function getExportedIds(platform, convId) {
  const key = storageKey(platform, convId);
  const data = await chrome.storage.local.get(key);
  return new Set(data[key] || []);
}

async function appendExportedIds(platform, convId, newIds) {
  const key = storageKey(platform, convId);
  const existing = await getExportedIds(platform, convId);
  const merged = [...new Set([...existing, ...newIds])];
  await chrome.storage.local.set({ [key]: merged });
  return merged.length;
}

async function clearExportedIds(platform, convId) {
  await chrome.storage.local.remove(storageKey(platform, convId));
}

// ── Stable ID generation ───────────────────────────────────────────────────────

// FNV-1a 32-bit hash — avoids btoa() unicode issues
function fnv1a(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

const INDEX_ID_RE = /^(turn|msg|prose|gem|grok|kimi|metaai|cursor|art|chatgpt|cursor)-\d+$/;

function makeStableId(platform, convId, msg, index) {
  // Use the native DOM id if it looks like a real UUID/token, not our fallback index
  if (msg.id && !INDEX_ID_RE.test(msg.id)) {
    return `${platform}:${convId}:${msg.id}`;
  }
  // Hash of role + first 150 chars of content for content-addressed dedup
  const hash = fnv1a(`${msg.role}:${msg.content.substring(0, 150)}`);
  return `${platform}:${convId}:${hash}`;
}

// ── DOM helpers ────────────────────────────────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function $id(id) { return document.getElementById(id); }

// ── Tab communication ──────────────────────────────────────────────────────────

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function sendToTab(tabId, msg) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, msg, response => {
      if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
      else resolve(response);
    });
  });
}

// ── Download helper ────────────────────────────────────────────────────────────

function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// ── Export action ──────────────────────────────────────────────────────────────

async function doExport(tab, status, exportedIds) {
  const $btn    = $id('btn-export');
  const $result = $id('result');

  $btn.disabled = true;
  $btn.textContent = 'Extracting…';
  $result.innerHTML = '';

  let extracted;
  try {
    extracted = await sendToTab(tab.id, { type: 'EXTRACT' });
  } catch (e) {
    $result.innerHTML = `<span class="result-err">Extraction failed: ${esc(e.message)}</span>`;
    $btn.disabled = false;
    $btn.textContent = 'Export New Messages';
    return;
  }

  if (!extracted || extracted.error) {
    $result.innerHTML = `<span class="result-err">${esc(extracted?.error || 'Unknown error')}</span>`;
    $btn.disabled = false;
    $btn.textContent = 'Export New Messages';
    return;
  }

  const { platform, convId, title, url, messages = [] } = extracted;

  // Assign stable IDs and split new vs. already-exported
  const newMessages = [];
  const newIds      = [];

  messages.forEach((msg, i) => {
    const sid = makeStableId(platform, convId, msg, i);
    if (!exportedIds.has(sid)) {
      newMessages.push({ id: sid, seq: i + 1, role: msg.role, content: msg.content });
      newIds.push(sid);
    }
  });

  if (newMessages.length === 0) {
    $result.innerHTML = `<span class="result-info">No new messages — all ${messages.length} already exported.</span>`;
    $btn.disabled = false;
    $btn.textContent = 'Export New Messages';
    return;
  }

  // Build output
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const safeConvId = (convId || 'chat').substring(0, 14);
  const filename = `${platform}-${safeConvId}-${ts}.json`;

  const output = {
    type:             'chat_export',
    version:          1,
    platform,
    conversation_id:  convId,
    title,
    url,
    exported_at:      new Date().toISOString(),
    new_messages:     newMessages.length,
    total_messages:   messages.length,
    already_exported: messages.length - newMessages.length,
    forest_path:      `mailbox/${filename}`,
    messages:         newMessages,
  };

  downloadJson(output, filename);

  // Persist exported IDs
  const totalStored = await appendExportedIds(platform, convId, newIds);

  $result.innerHTML = `<span class="result-ok">✓ Exported ${newMessages.length} new message${newMessages.length !== 1 ? 's' : ''}.</span>`;
  $btn.disabled = false;
  $btn.textContent = 'Export New Messages';

  // Update stat chips live
  const $newNum    = document.querySelector('.new-chip .num');
  const $cachedNum = document.querySelector('.cached-chip .num');
  if ($newNum)    $newNum.textContent = '0';
  if ($cachedNum) $cachedNum.textContent = totalStored;
}

// ── Render helpers ─────────────────────────────────────────────────────────────

function renderUnknown() {
  $id('status-text').textContent = 'Not an AI chat page';
  $id('main').innerHTML = `
    <div class="state-msg">
      Open a chat page on Claude, ChatGPT, Gemini,<br>Grok, Kimi, Meta AI, or Cursor.
    </div>`;
}

function renderError(msg) {
  $id('status-text').textContent = 'Error';
  $id('main').innerHTML = `<div class="state-msg result-err">${esc(msg)}</div>`;
}

async function renderPlatform(tab, status) {
  const { platform, convId, title, isClaudeShare, messageCount } = status;
  const label  = PLATFORM_LABELS[platform] || platform;
  const colors = PLATFORM_COLORS[platform] || { fg: '#3eb870', bg: 'rgba(62,184,112,0.12)' };

  // Badge
  const $badge = $id('platform-badge');
  $badge.textContent = label;
  $badge.style.color           = colors.fg;
  $badge.style.borderColor     = colors.fg;
  $badge.style.backgroundColor = colors.bg;

  $id('status-text').textContent = convId ? `#${convId.substring(0, 10)}…` : 'No conversation ID';

  // Tip message
  let tipHtml = '';
  if (platform === 'claude') {
    const tipText = isClaudeShare
      ? PLATFORM_TIPS.claude.share
      : PLATFORM_TIPS.claude.regular;
    const tipClass = isClaudeShare ? 'ok' : 'warn';
    tipHtml = `<div class="tip ${tipClass}">${esc(tipText)}</div>`;
  } else if (PLATFORM_TIPS[platform]) {
    tipHtml = `<div class="tip info">${esc(PLATFORM_TIPS[platform])}</div>`;
  }

  // Dedup stats
  const exportedIds = convId ? await getExportedIds(platform, convId) : new Set();
  const cachedCount = exportedIds.size;
  const newCount    = Math.max(0, messageCount - cachedCount);

  const clearBtn = cachedCount > 0
    ? `<button id="btn-clear" class="btn-ghost" title="Re-export all messages">Clear cache</button>`
    : '';

  $id('main').innerHTML = `
    <div class="conv-info">
      <div class="conv-title">${esc(title)}</div>
      ${convId ? `<div class="conv-id">${esc(convId)}</div>` : ''}
    </div>

    ${tipHtml}

    <div class="stats-row">
      <div class="stat-chip new-chip">
        <div class="num">${newCount}</div>
        <div class="lbl">new</div>
      </div>
      <div class="stat-chip cached-chip">
        <div class="num">${cachedCount}</div>
        <div class="lbl">cached</div>
      </div>
      <div class="stat-chip">
        <div class="num">${messageCount}</div>
        <div class="lbl">visible</div>
      </div>
    </div>

    <div class="actions">
      <button id="btn-export" class="btn-primary">Export New Messages</button>
      ${clearBtn}
    </div>

    <div id="result"></div>
  `;

  $id('btn-export').addEventListener('click', () => doExport(tab, status, exportedIds));

  $id('btn-clear')?.addEventListener('click', async () => {
    await clearExportedIds(platform, convId);
    // Re-render fresh
    renderPlatform(tab, { ...status, messageCount });
  });
}

// ── Init ───────────────────────────────────────────────────────────────────────

async function init() {
  let tab;
  try {
    tab = await getActiveTab();
  } catch {
    renderError('No active tab found.');
    return;
  }

  let status;
  try {
    status = await sendToTab(tab.id, { type: 'GET_STATUS' });
  } catch {
    renderUnknown();
    return;
  }

  if (!status?.platform) {
    renderUnknown();
    return;
  }

  await renderPlatform(tab, status);
}

init().catch(e => renderError(e.message));
