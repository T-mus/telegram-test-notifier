const core = require('@actions/core')
const fs = require('fs')

async function run() {
    try {
        const telegramBotToken = core.getInput('telegram_bot_token')
        const telegramChatId = core.getInput('telegram_chat_id')
        const reportFile = core.getInput('report_file')
        const message = core.getInput('message')

        if (!fs.existsSync(reportFile)) {
            throw new Error(`Report file not found: ${reportFile}`)
        }
        const url = `https://api.telegram.org/bot${telegramBotToken}/sendDocument`

        const formData = new FormData()
        formData.append('chat_id', telegramChatId)
        formData.append('document', fs.createReadStream(reportFile))
        formData.append('caption', message)
        formData.append('parse_mode', 'Markdown')

        const response = await fetch(url, { method: 'POST', body: formData })

        console.log('Report sent successfully:', response.data)
    } catch (error) {
        core.setFailed(`Error: ${error.message}`)
        console.log(error)        
    }
}

run()
