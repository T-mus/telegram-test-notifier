# Send a test report to Telegram

**Send Report to Telegram** is a GitHub Action that allows you to send test reports or other files to a Telegram chat using a bot.

## Features

- Send documents (e.g., test reports) to Telegram.
- Support for custom messages with the commit hash.
- Easy integration into existing workflows.
- Supports Markdown formatting for messages.

## Input Parameters

### `telegram_bot_token` (required)

The token for the Telegram bot. You can obtain it from [BotFather](https://t.me/BotFather).

### `telegram_chat_id` (required)

The chat ID where the message will be sent. You can obtain it by adding the bot to the chat and using the [getUpdates](https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates) method.

### `report_file` (required)

The path to the report file that needs to be sent. For example: `./report/report.html`.

### `message` (optional)

The message to be included with the report. Markdown formatting is supported.

- **Default:** `'Test report for build: `${{ github.sha }}`'`

## Usage

Here's how you can use this action in your workflow:

```yaml
jobs:
  notify-telegram:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Download a test report artifact
        uses: actions/download-artifact@v3
        with:
          name: test-report
          path: ./report

      - name: Send report to Telegram
        uses: T-mus/telegram-test-notifier@v1
        with:
          telegram_bot_token: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          telegram_chat_id: ${{ secrets.TELEGRAM_CHAT_ID }}
          report_file: './report/report.html'
          message: 'Test report for build: `${{ github.sha }}`'
```
