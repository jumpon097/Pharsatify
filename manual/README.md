# คู่มือกระจายระบบ Pharsatify

คู่มือนี้ใช้สำหรับนำระบบประเมินความพึงพอใจไปใช้กับห้องหรือหน่วยงานอื่น โดยใช้ GitHub repository เดิมและแยกเป็น subfolder

หน้าเว็บคู่มือหลังอัปโหลด:

`https://jumpon097.github.io/Pharsatify/manual/`

## โครงสร้างที่แนะนำ

```text
Pharsatify/
├─ index.html
├─ manifest.webmanifest
├─ sw.js
├─ manual/
│  ├─ index.html
│  └─ README.md
├─ room9/
│  ├─ index.html
│  ├─ manifest.webmanifest
│  └─ sw.js
└─ chemo/
   ├─ index.html
   ├─ manifest.webmanifest
   └─ sw.js
```

URL ของแต่ละหน่วยงาน:

```text
https://jumpon097.github.io/Pharsatify/room9/
https://jumpon097.github.io/Pharsatify/chemo/
```

## สิ่งที่ต้องเตรียมต่อหนึ่งหน่วยงาน

1. Google Form สำหรับคะแนนและข้อเสนอแนะ
2. Google Sheet ที่เชื่อมกับ Form
3. Telegram Chat ID ของหน่วยงาน
4. GAS project และ Web App URL
5. ชื่อ subfolder ภาษาอังกฤษ ตัวพิมพ์เล็ก และไม่มีช่องว่าง

## ค่าใน Code.gs ที่ต้องเปลี่ยน

```javascript
const APP_CONFIG = Object.freeze({
  FORM_ID: 'FORM_ID_ใหม่',
  SPREADSHEET_ID: 'SPREADSHEET_ID_ใหม่',
  RESPONSE_SHEET_ID: 123456789,

  APP_TITLE: 'ประเมินความพึงพอใจ',
  SERVICE_NAME: 'ชื่อห้องหรือหน่วยงาน',
  HOSPITAL_NAME: 'โรงพยาบาลมะเร็งอุบลราชธานี',

  DEFAULT_CHAT_ID: 'CHAT_ID_ใหม่'
});
```

`RESPONSE_SHEET_ID` คือเลข `gid` ของแท็บตอบกลับ ไม่ใช่ Spreadsheet ID

## Telegram

เก็บ Bot Token ใน Script Properties เท่านั้น ห้ามใส่ Token ใน GitHub

```text
TELEGRAM_BOT_TOKEN = Token ของ Bot
TELEGRAM_CHAT_ID = Chat ID ของกลุ่ม
```

รัน `setupTelegramConfig()` และ `authorizeSystem()` อย่างละหนึ่งครั้ง

## Deploy GAS

1. Deploy → New deployment
2. Type: Web app
3. Execute as: Me
4. Who has access: Anyone
5. Deploy และคัดลอก URL ที่ลงท้าย `/exec`

เมื่อแก้ GAS ภายหลัง:

`Deploy → Manage deployments → Edit → New version → Deploy`

วิธีนี้ URL เดิมจะยังใช้งานต่อได้

## สร้าง PWA subfolder

คัดลอกไฟล์ PWA 3 ไฟล์ไปไว้ใน subfolder ใหม่

```text
index.html
manifest.webmanifest
sw.js
```

แก้ GAS URL ใน `index.html`

```html
<iframe id="appFrame" src="GAS_URL_ใหม่"></iframe>
```

แก้ชื่อใน `manifest.webmanifest`

```json
{
  "name": "ประเมินความพึงพอใจ ชื่อหน่วยงาน",
  "short_name": "ประเมินชื่อย่อ",
  "start_url": "./",
  "scope": "./",
  "display": "standalone"
}
```

แต่ละ subfolder ต้องมี `manifest.webmanifest` และ `sw.js` ของตนเอง เพื่อให้ติดตั้งเป็น PWA คนละแอป

## การแบ่งหน้าที่

- ผู้ดูแลกลาง: เก็บ Code.gs ต้นแบบ ดูแล GitHub และ Deploy
- ผู้รับผิดชอบหน่วยงาน: สร้าง Form/Sheet แจ้งชื่อหน่วยงานและ Chat ID
- ผู้ทดสอบ: ทดลองให้คะแนน ตรวจชีต ตรวจ Telegram และทดสอบกลับหน้าประเมินใน 5 วินาที

## Checklist ก่อนเปิดใช้

- [ ] คะแนนบันทึกลงชีตถูกแท็บ
- [ ] ข้อเสนอแนะบันทึกถูกคอลัมน์
- [ ] Telegram ส่งเข้ากลุ่มถูกต้อง
- [ ] หน้า PWA แสดงชื่อหน่วยงานถูกต้อง
- [ ] หน้าขอบคุณกลับหน้าประเมินใน 5 วินาที
- [ ] ทดลองติดตั้ง PWA บนมือถือหรือคอมพิวเตอร์
- [ ] ไม่มี Bot Token อยู่ใน GitHub

## การแก้ไขภายหลัง

- แก้หน้าตาแบบประเมิน: แก้ `Index.html` ใน GAS แล้ว Deploy New version
- เปลี่ยน Form/Sheet/Chat ID: แก้ `Code.gs` แล้ว Deploy New version
- เปลี่ยน GAS URL: แก้ `index.html` ใน subfolder ของ GitHub
- PWA ยังแสดงของเก่า: รีโหลดแบบไม่ใช้แคช หรือเพิ่มเลขเวอร์ชันใน `CACHE_NAME` ของ `sw.js`
