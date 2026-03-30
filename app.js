import pkg from '@slack/bolt';
const { App } = pkg;
import { exec } from 'child_process';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// 1. 인사 응답
app.message('안녕', async ({ message, say }) => {
  await say(`반갑습니다 Younghoo님! 전략기획팀 업무를 도와드릴 준비가 되었습니다. 🚀`);
});

// 2. GitHub 저장소 목록 조회 (gh repo list)
app.message('목록', async ({ message, say }) => {
  exec('gh repo list', (error, stdout, stderr) => {
    if (error) {
      say(`❌ 에러 발생: ${error.message}`);
      return;
    }
    say(`📂 **Younghoo님의 GitHub 저장소 목록입니다:**\n\n${stdout}`);
  });
});

(async () => {
  await app.start();
  console.log('⚡️ LG전자 전략기획팀 OpenClaw 봇이 업그레이드되어 실행 중입니다!');
})();
