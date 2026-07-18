# วิธีใช้รูปมาสคอตแทน Rating Emoji

อัปโหลดไฟล์ PNG ทั้ง 5 รูปไว้ในพื้นที่ที่หน้า `Index.html` เรียกใช้ได้ เช่น GitHub Pages:

```text
assets/rating-5-very-satisfied.png
assets/rating-4-satisfied.png
assets/rating-3-neutral.png
assets/rating-2-dissatisfied.png
assets/rating-1-very-dissatisfied.png
```

จากนั้นแทนตัวเลือกคะแนนเดิมด้วย:

```html
<div class="rating-grid" role="radiogroup" aria-label="ระดับความพึงพอใจ">
  <button type="button" class="rating-card"
    data-rating="พึงพอใจมาก ๆ / Very Satisfied">
    <img src="assets/rating-5-very-satisfied.png" alt="ประทับใจมาก">
    <span>ประทับใจมาก</span>
  </button>

  <button type="button" class="rating-card"
    data-rating="พึงพอใจ / Satisfied">
    <img src="assets/rating-4-satisfied.png" alt="ประทับใจ">
    <span>ประทับใจ</span>
  </button>

  <button type="button" class="rating-card"
    data-rating="เฉย ๆ / Neutral">
    <img src="assets/rating-3-neutral.png" alt="เฉย ๆ">
    <span>เฉย ๆ</span>
  </button>

  <button type="button" class="rating-card"
    data-rating="ไม่พอใจ / Dissatisfied">
    <img src="assets/rating-2-dissatisfied.png" alt="ไม่พอใจ">
    <span>ไม่พอใจ</span>
  </button>

  <button type="button" class="rating-card"
    data-rating="ไม่พอใจมาก / Very Dissatisfied">
    <img src="assets/rating-1-very-dissatisfied.png" alt="ไม่ประทับใจ">
    <span>ไม่ประทับใจ</span>
  </button>
</div>

<input type="hidden" id="ratingValue" name="rating" required>
```

เพิ่ม CSS ใน `<style>`:

```css
.rating-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  gap: 14px;
}

.rating-card {
  border: 3px solid transparent;
  border-radius: 24px;
  padding: 10px;
  background: #fff;
  cursor: pointer;
  transition: .18s ease;
}

.rating-card img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1.1;
  object-fit: contain;
}

.rating-card span {
  display: block;
  margin-top: 4px;
  color: #9d2f68;
  font-weight: 800;
}

.rating-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(190, 24, 93, .14);
}

.rating-card.is-selected {
  border-color: #ec4899;
  background: #fff3f8;
  box-shadow: 0 0 0 5px rgba(236, 72, 153, .12);
  transform: translateY(-4px) scale(1.02);
}

@media (max-width: 820px) {
  .rating-grid {
    grid-template-columns: repeat(2, minmax(130px, 1fr));
  }

  .rating-card:last-child {
    grid-column: 1 / -1;
    width: min(55%, 230px);
    justify-self: center;
  }
}
```

เพิ่ม JavaScript ก่อน `</script>` หรือรวมไว้ในสคริปต์เดิม:

```javascript
const ratingValue = document.getElementById('ratingValue');
const ratingCards = document.querySelectorAll('.rating-card');

ratingCards.forEach((card) => {
  card.addEventListener('click', () => {
    ratingCards.forEach((item) => {
      item.classList.remove('is-selected');
      item.setAttribute('aria-checked', 'false');
    });

    card.classList.add('is-selected');
    card.setAttribute('aria-checked', 'true');
    ratingValue.value = card.dataset.rating;

    // ใช้ชื่อปุ่มส่งจริงในโปรเจกต์ของคุณ
    if (typeof submitButton !== 'undefined') {
      submitButton.disabled = false;
    }
  });
});
```

ข้อสำคัญ: ค่าใน `data-rating` ต้องตรงกับข้อความคะแนนที่ระบบบันทึกลงชีตเดิม
