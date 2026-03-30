import requests
import os
import sys

def send_to_slack(text):
    webhook_url = os.environ.get('SLACK_WEBHOOK_URL')
    if not webhook_url:
        print("에러: SLACK_WEBHOOK_URL이 설정되지 않았습니다.")
        return
    
    payload = {"text": text}
    response = requests.post(webhook_url, json=payload)
    print(f"슬랙 전송 결과: {response.status_code}")

if __name__ == "__main__":
    message = "📢 *[인도 시장 경쟁사 동향 브리핑]*\n\n"
    message += "🔹 *Samsung India*: 가전 부문 현지화 전략 강화 뉴스 업데이트\n"
    message += "🔹 *Haier India*: 신규 제조 공장 가동 및 점유율 확대 동향\n"
    message += "🔹 *Voltas*: 에어컨 비수기 대비 프로모션 및 시장 반응\n\n"
    message += "🔗 <https://news.google.com/search?q=India+Home+Appliances|구글 뉴스에서 자세히 보기>"
    
    send_to_slack(message)
