# Next.js + Tailwind CSS Basic Project

โครงสร้างพื้นฐานสำหรับการเริ่มต้นพัฒนาเว็บด้วย Next.js และ Tailwind CSS

---

## 🚀 วิธีติดตั้งและเริ่มต้น

### 1. ติดตั้ง dependencies
```bash
npm install
# หรือใช้ yarn:
# yarn install
```

### 2. รันเซิร์ฟเวอร์ backend 
```bash
cd backend
npm run seed
npm run dev
```

### 3. กลับไปโฟล์เดอร์หลัก แล้วรันเซิร์ฟเวอร์ dev  
```bash
npm run dev
# หรือใช้ yarn:
# yarn dev
```

### 4. เปิดเว็บ
เข้า browser ที่ http://localhost:3000

---

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend:**  
  - [Next.js](https://nextjs.org/)  
  - [React](https://reactjs.org/)  
  - [Tailwind CSS](https://tailwindcss.com/)  
  - TypeScript

- **Backend:**  
  - Node.js (Express)  
  - REST API

- **Database:**  
  - MongoDB

- **Authentication:**  
  - JWT (JSON Web Token)  
  - Middleware ตรวจสอบสิทธิ์

- **Security:**  
  - การเข้ารหัสรหัสผ่าน (bcrypt)  
  - ตรวจสอบ token  
  - CORS

- **Hosting:**  
  - รองรับการ deploy บน Vercel/Render/Heroku (ยังไม่ deploy จริง)

---

## 📦 ฟังก์ชั่นหลัก (Features)

- **ระบบสมาชิก**
  - สมัครสมาชิก (Sign Up) ✔️
  - เข้าสู่ระบบ (Login/Logout) ✔️
  - ตรวจสอบสิทธิ์ผู้ใช้ (Auth Middleware) ✔️

- **ระบบเมนูบิงซู**
  - แสดงรายการเมนูบิงซูทั้งหมด ✔️
  - เพิ่ม/แก้ไข/ลบเมนู (สำหรับแอดมิน) ⏳

- **ระบบสั่งซื้อ**
  - เลือกเมนูและเพิ่มลงตะกร้า ✔️
  - สั่งซื้อสินค้า ⏳
  - ดูประวัติการสั่งซื้อ ⏳

- **ระบบรีวิว**
  - เขียนรีวิวเมนู ✔️
  - ดูรีวิวเมนู ✔️

- **ระบบโค้ดโปรโมชั่น**
  - กรอกโค้ดส่วนลด ✔️
  - ตรวจสอบโค้ดและลดราคา ⏳

- **ระบบโปรไฟล์**
  - ดู/แก้ไขข้อมูลส่วนตัว ⏳

- **ระบบแอดมิน**
  - จัดการผู้ใช้/เมนู/ออเดอร์ ⏳

> ✔️ = เสร็จแล้ว  
> ⏳ = กำลังพัฒนา

---

## 📁 โฟลเดอร์สำคัญ

- `src/pages/` — หน้าเว็บแต่ละหน้า
- `src/components/` — คอมโพเนนต์แยกย่อย
- `src/styles/globals.css` — ไฟล์ CSS หลักรวม Tailwind
- `backend/` — โค้ดฝั่งเซิร์ฟเวอร์ (Express, MongoDB)

---

## 🧑‍💻 ผู้พัฒนา

- 66022589 ณัชชา จันทร์ทอง Backend
- 66026066 นภัสสร แสวงศรี Frontend
- 66026123 วราลี สาทุ่ง UX/UI
