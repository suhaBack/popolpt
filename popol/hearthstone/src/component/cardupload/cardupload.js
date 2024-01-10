import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import Heroform from "./heroform";
import Minionform from "./minionform";
import Placeform from "./placeform";
import Spellform from "./spellform";
import Weaponform from "./weaponform";
import axios from "axios";

function Cardupload() {
  const [checked, setChecked] = React.useState({
    weapon: false,
    minion: false,
    spell: false,
    place: false,
    hero: false,
  });
  const [kind, setKind] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [pack, setPack] = useState("");
  const [tribe, setTribe] = useState("");
  const [job, setJob] = useState("");
  const [property, setProperty] = useState("");
  const [durability, setDurability] = useState("");
  const [atteck, setAtteck] = useState("");
  const [cost, setCost] = useState("");
  const [hp, setHp] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append("name", name);
    formDataWithImage.append("rating", rating);
    formDataWithImage.append("pack", pack);
    formDataWithImage.append("tribe", tribe);
    formDataWithImage.append("job", job);
    formDataWithImage.append("property", property);
    formDataWithImage.append("durability", durability);
    formDataWithImage.append("atteck", atteck);
    formDataWithImage.append("cost", cost);
    formDataWithImage.append("hp", hp);
    formDataWithImage.append("img", imageFile);

    axios.post("/cardupload", formDataWithImage).then((result) => {
      console.log(result.data);
    })
  };

  const imageChange = (e) => {
    // 파일 입력을 따로 처리합니다.
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);

    // 이미지 프리뷰 업데이트
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageClick = () => {
    // 이미지 클릭 시 파일 선택 인풋창 클릭
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const imageInputRef = React.createRef();

  const handleChange = (type) => () => {
    setChecked({
      weapon: type === "weapon",
      minion: type === "minion",
      spell: type === "spell",
      place: type === "place",
      hero: type === "hero",
    });

    setName("");
    setRating("");
    setPack("");
    setTribe("");
    setJob("");
    setProperty("");
    setDurability("");
    setAtteck("");
    setCost("");
    setHp("");
    setImageFile("");
    setImagePreview("");

    // 해당 체크박스에 따라 상태 업데이트
    if (type === "weapon") {
      setKind("무기");
    } else if (type === "minion") {
      setKind("하수인");
    } else if (type === "spell") {
      setKind("주문");
    } else if (type === "place") {
      setKind("장소");
    } else if (type === "hero") {
      setKind("영웅변신");
    }
  };

  return (
    <div>
      카드 업로드
      <Checkbox
        checked={checked.minion}
        onChange={handleChange("minion")}
        inputProps={{ "aria-label": "하수인" }}
      />
      하수인
      <Checkbox
        checked={checked.spell}
        onChange={handleChange("spell")}
        inputProps={{ "aria-label": "주문" }}
      />
      주문
      <Checkbox
        checked={checked.weapon}
        onChange={handleChange("weapon")}
        inputProps={{ "aria-label": "무기" }}
      />
      무기
      <Checkbox
        checked={checked.place}
        onChange={handleChange("place")}
        inputProps={{ "aria-label": "장소" }}
      />
      장소
      <Checkbox
        checked={checked.hero}
        onChange={handleChange("hero")}
        inputProps={{ "aria-label": "영웅변신" }}
      />
      영웅변신
      <div style={{ marginBottom: "1vw" }}>현상황: {kind}</div>
      <div style={{ marginBottom: "1vw" }}>카드명: {name}</div>
      <div style={{ marginBottom: "1vw" }}>공격력: {atteck}</div>
      <div style={{ marginBottom: "1vw" }}>생명력: {hp}</div>
      <div style={{ marginBottom: "1vw" }}>내구도: {durability}</div>
      <div style={{ marginBottom: "1vw" }}>속성: {property}</div>
      <div style={{ marginBottom: "1vw" }}>코스트: {cost}</div>
      <div style={{ marginBottom: "1vw" }}>직업: {job}</div>
      <div style={{ marginBottom: "1vw" }}>종족: {tribe}</div>
      <div style={{ marginBottom: "1vw" }}>확장팩: {pack}</div>
      <div style={{ marginBottom: "1vw" }}>등급: {rating}</div>
      {kind === "하수인" && (
        <Minionform
          imageInputRef={imageInputRef}
          imageChange={imageChange}
          imagePreview={imagePreview}
          handleImageClick={handleImageClick}
          name={name}
          setName={setName}
          job={job}
          setJob={setJob}
          pack={pack}
          setPack={setPack}
          rating={rating}
          setRating={setRating}
          tribe={tribe}
          setTribe={setTribe}
          cost={cost}
          setCost={setCost}
          atteck={atteck}
          setAtteck={setAtteck}
          hp={hp}
          setHp={setHp}
        ></Minionform>
      )}
      {kind === "주문" && (
        <Spellform
          imageInputRef={imageInputRef}
          imageChange={imageChange}
          imagePreview={imagePreview}
          handleImageClick={handleImageClick}
          name={name}
          setName={setName}
          job={job}
          setJob={setJob}
          pack={pack}
          setPack={setPack}
          rating={rating}
          setRating={setRating}
          property={property}
          setProperty={setProperty}
          cost={cost}
          setCost={setCost}
        ></Spellform>
      )}
      {kind === "무기" && (
        <Weaponform
          imageInputRef={imageInputRef}
          imageChange={imageChange}
          imagePreview={imagePreview}
          handleImageClick={handleImageClick}
          name={name}
          setName={setName}
          job={job}
          setJob={setJob}
          pack={pack}
          setPack={setPack}
          rating={rating}
          setRating={setRating}
          cost={cost}
          setCost={setCost}
          atteck={atteck}
          setAtteck={setAtteck}
          durability={durability}
          setDurability={setDurability}
        ></Weaponform>
      )}
      {kind === "장소" && (
        <Placeform
          imageInputRef={imageInputRef}
          imageChange={imageChange}
          imagePreview={imagePreview}
          handleImageClick={handleImageClick}
          name={name}
          setName={setName}
          job={job}
          setJob={setJob}
          pack={pack}
          setPack={setPack}
          rating={rating}
          setRating={setRating}
          cost={cost}
          setCost={setCost}
          durability={durability}
          setDurability={setDurability}
        ></Placeform>
      )}
      {kind === "영웅변신" && (
        <Heroform
          imageInputRef={imageInputRef}
          imageChange={imageChange}
          imagePreview={imagePreview}
          handleImageClick={handleImageClick}
          name={name}
          setName={setName}
          job={job}
          setJob={setJob}
          pack={pack}
          setPack={setPack}
          rating={rating}
          setRating={setRating}
          cost={cost}
          setCost={setCost}
        ></Heroform>
      )}
      <div onClick={handleSubmit}>등록</div>
    </div>
  );
}

export default Cardupload;
