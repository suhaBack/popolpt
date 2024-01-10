import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

function Placeform(props){
  return (
    <div>
          <input
            ref={props.imageInputRef}
            style={{ display: "none" }}
            name="img"
            type="file"
            accept="image/*"
            onChange={props.imageChange}
          />
          {props.imagePreview && (
            <div>
              <img
                src={props.imagePreview}
                alt="이미지 미리보기"
                style={{ maxWidth: "100%", cursor: "pointer" }}
                onClick={props.handleImageClick}
              />
            </div>
          )}
          {!props.imagePreview && (
            <button type="button" onClick={props.handleImageClick}>
              이미지 선택
            </button>
          )}
          <TextField
            id="outlined-basic"
            label="카드명"
            variant="outlined"
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
            InputProps={{
              style: {}, // 원하는 크기 및 패딩을 지정하세요.
            }}
          />

          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id="job-label">직업</InputLabel>
            <Select
              labelId="job-label"
              id="job-select"
              value={props.job}
              label="직업"
              onChange={(e) => props.setJob(e.target.value)}
            >
              <MenuItem value={"중립"}>중립</MenuItem>
              <MenuItem value={"죽음의기사"}>죽음의기사</MenuItem>
              <MenuItem value={"악마사냥꾼"}>악마사냥꾼</MenuItem>
              <MenuItem value={"사제"}>사제</MenuItem>
              <MenuItem value={"마법사"}>마법사</MenuItem>
              <MenuItem value={"흑마법사"}>흑마법사</MenuItem>
              <MenuItem value={"드루이드"}>드루이드</MenuItem>
              <MenuItem value={"사냥꾼"}>사냥꾼</MenuItem>
              <MenuItem value={"성기사"}>성기사</MenuItem>
              <MenuItem value={"도적"}>도적</MenuItem>
              <MenuItem value={"주술사"}>주술사</MenuItem>
              <MenuItem value={"전사"}>전사</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id="pack-label">확장팩</InputLabel>
            <Select
              labelId="pack-label"
              id="pack-select"
              value={props.pack}
              label="확장팩"
              onChange={(e) => props.setPack(e.target.value)}
            >
              <MenuItem value={"황야의 땅 결투"}>황야의 땅 결투</MenuItem>
              <MenuItem value={"티탄"}>티탄</MenuItem>
              <MenuItem value={"전설노래자랑"}>전설노래자랑</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id="rating-label">등급</InputLabel>
            <Select
              labelId="rating-label"
              id="rating-select"
              value={props.rating}
              label="등급"
              onChange={(e) => props.setRating(e.target.value)}
            >
              <MenuItem value={"무료"}>무료</MenuItem>
              <MenuItem value={"일반"}>일반</MenuItem>
              <MenuItem value={"희귀"}>희귀</MenuItem>
              <MenuItem value={"특급"}>특급</MenuItem>
              <MenuItem value={"전설"}>전설</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            label="코스트"
            type='number'
            variant="outlined"
            value={props.cost}
            onChange={(e) => props.setCost(e.target.value)}
            InputProps={{
              style: {}, // 원하는 크기 및 패딩을 지정하세요.
            }}
          />

          <TextField
            id="outlined-basic"
            label="내구도"
            type='number'
            variant="outlined"
            value={props.durability}
            onChange={(e) => props.setDurability(e.target.value)}
            InputProps={{
              style: {}, // 원하는 크기 및 패딩을 지정하세요.
            }}
          />
        </div>
  )
}

export default Placeform