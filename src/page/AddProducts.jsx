import React, { useState } from "react";
import { addNewProduct } from "../api/firebase";
import { uploadImage } from "../api/uploader";
import LableInput from "../components/Form/LableInput";

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
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">🤙{success}😍</p>}
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="local file"
          className="w-96 m-auto mb-4"
        />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col px-12 gap-2">
        <div className="w-full flex gap-4">
          <label htmlFor="addFile" className="w-3/12 text-start">
            제품사진
          </label>
          <input
            type="file"
            name="file"
            id="addFile"
            accept="image/*"
            required
            onChange={handleChange}
          />
        </div>
        <LableInput
          htmlFor={`productCategory`}
          text={`카테고리`}
          type={`text`}
          name={`category`}
          id={`productCategory`}
          onChange={handleChange}
          value={product.category ?? ""}
          placeholder={`카테고리`}
          required
        />
        <LableInput
          htmlFor={`productTitle`}
          text={`제품명`}
          type={`text`}
          name={`title`}
          id={`productTitle`}
          onChange={handleChange}
          value={product.title ?? ""}
          placeholder={`제품명`}
          required
        />
        <LableInput
          htmlFor={`productPrice`}
          text={`제품가격(per 100g)`}
          type={`number`}
          name={`price`}
          id={`productPrice`}
          onChange={handleChange}
          value={product.price ?? ""}
          placeholder={`제품가격`}
          required
        />
        <LableInput
          htmlFor={`productDescription`}
          text={`제품설명`}
          type={`text`}
          name={`description`}
          id={`productDescription`}
          onChange={handleChange}
          value={product.description ?? ""}
          placeholder={`제품설명`}
          required
        />
        <LableInput
          htmlFor={`productUnit`}
          text={`구매옵션(g)`}
          type={`text`}
          name={`options`}
          id={`productUnit`}
          onChange={handleChange}
          value={product.options ?? ""}
          placeholder={`구매옵션은 쉼표로 구분`}
          required
        />
        <button
          className="px-6 py-4 rounded-md bg-red-400 text-white mt-6"
          disabled={isUploading}>
          {isUploading ? "업로드중" : "제품등록하기"}
        </button>
      </form>
    </section>
  );
}
