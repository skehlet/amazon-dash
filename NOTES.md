```bash
sudo HUBOT_USERNAME=hubot-username HUBOT_PASSWORD=hubot-password ./runme.js 

curl \
    -u hubot-username:hubot-password \
    -X POST \
    http://127.0.0.1:8080/message/amazon-dash-test \
    -d 'message=hello'
```
