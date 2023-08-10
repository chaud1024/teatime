import React, { useState } from "react";
import { uploadImage } from "../api/uploader";

export default function AddProducts() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // 제품 사진을 Cloudinary에 업로드하고 url획득
    uploadImage(file).then((url) => {
      console.log(url);
    });
    // Firebae에 새로운 제품 추가
  };
  return (
    <section>
      <h2>새로운 제품 등록</h2>
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="addFile">제품사진추가</label>
          <input
            type="file"
            name="file"
            id="addFile"
            accept="image/*"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="productTitle">제품명</label>
          <input
            type="text"
            name="title"
            value={product.title ?? ""}
            id="productTitle"
            placeholder="제품명"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="productPrice">제품가격</label>
          <input
            type="number"
            name="price"
            value={product.price ?? ""}
            id="productPrice"
            placeholder="제품가격"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="productCategory">카테고리</label>
          <input
            type="text"
            name="category"
            value={product.category ?? ""}
            id="productCategory"
            placeholder="카테고리"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="productDescription">제품설명</label>
          <input
            type="text"
            name="description"
            value={product.description ?? ""}
            id="productDescription"
            placeholder="제품설명"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="productUnit">구매옵션</label>
          <input
            type="text"
            name="options"
            value={product.options ?? ""}
            id="productUnit"
            placeholder="구매옵션은 쉼표로 구분"
            required
            onChange={handleChange}
          />
        </div>
        <button className="px-6 py-4 rounded-md bg-red-400 text-white">
          제품등록하기
        </button>
      </form>
    </section>
  );
}
