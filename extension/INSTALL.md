# Lotus Exporter — Browser Extension

Export AI conversations from Claude, ChatGPT, Gemini, Grok, Kimi, Meta AI, and Cursor.
Deduplicates across exports so only new messages are saved each run.

## Install (Chrome / Edge / Brave)

1. Download or clone this repo
2. Open `chrome://extensions`
3. Enable **Developer mode** (toggle, top-right)
4. Click **Load unpacked**
5. Select the `extension/` folder
6. Pin the extension — it shows up on any supported AI chat page

## Usage

### Most platforms (ChatGPT, Gemini, Grok, Kimi, Meta AI)
1. Open a conversation
2. **Scroll to the top** so all messages are in the DOM
3. Click the Lotus Exporter icon → tap **Export New Messages**
4. A `.json` file downloads to your default folder

### Claude (requires share link)
Claude's regular chat page virtualizes older messages.  
Full export requires a share link:
1. In your conversation, tap **Share** → **Create public link** → copy it
2. Open that link in a new tab (it loads the full conversation as a reader)
3. Click Lotus Exporter → **Export New Messages**

> The popup shows a warning when you're on a regular Claude chat and gives the all-clear on share pages.

## Output format

Each export is a `.json` file:
```json
{
  "type": "chat_export",
  "version": 1,
  "platform": "claude",
  "conversation_id": "abc123",
  "title": "Chat about the Lotus suite",
  "url": "https://claude.ai/share/abc123",
  "exported_at": "2026-08-07T10:00:00.000Z",
  "new_messages": 5,
  "total_messages": 42,
  "already_exported": 37,
  "forest_path": "mailbox/claude-abc123-2026-08-07.json",
  "messages": [
    { "id": "claude:abc123:fnv-hash", "seq": 38, "role": "user",      "content": "..." },
    { "id": "claude:abc123:fnv-hash", "seq": 39, "role": "assistant", "content": "..." }
  ]
}
```

`forest_path` is a suggested path for filing in the Forest mailbox.

## Deduplication

Message IDs are computed from:
- **Native DOM ID** if the platform provides one (ChatGPT uses UUID `data-message-id`)
- **FNV-1a hash** of `role + first 150 chars of content` as a fallback

IDs are stored in `chrome.storage.local` keyed by `exported:{platform}:{conversationId}`.  
Tap **Clear cache** in the popup to re-export everything from a conversation.

## Supported platforms

| Platform | URL | Notes |
|----------|-----|-------|
| Claude | claude.ai | Use share link for full export |
| ChatGPT | chatgpt.com, chat.openai.com | Stable native message IDs |
| Gemini | gemini.google.com | Scroll to top first |
| Grok | grok.com, x.com | Scroll to top first |
| Kimi | kimi.moonshot.cn, kimi.ai | Scroll to top first |
| Meta AI | meta.ai | Scroll to top first |
| Cursor | cursor.com | Web chat only |
