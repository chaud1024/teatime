import React, { useState } from "react";
import { addNewProduct } from "../api/firebase";
import { uploadImage } from "../api/uploader";

export default function AddProducts() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

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
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addNewProduct(product, url).then(() => {
          setSuccess("성공적으로 제품이 추가되었습니다.");
          setTimeout(() => {
            setSuccess(null);
          }, 4000);
        });
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <section>
      <h2>새로운 제품 등록</h2>
      {success && <p>🤙{success}😍</p>}
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
        <button
          className="px-6 py-4 rounded-md bg-red-400 text-white"
          disabled={isUploading}>
          {isUploading ? "업로드중" : "제품등록하기"}
        </button>
      </form>
    </section>
  );
}
