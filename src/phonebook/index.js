import "./index.css";
import { useState, useEffect } from "react";

function PhoneBook() {
  const userdata = {
    name: "Varun",
    nickname: "varun nickname",
    contact: 5964621536,
  };

  const [data, setdata] = useState(userdata);

  return (
    <div className="wrapper">
      <Search />
      <AddContact userdata={data} update={setdata} />
    </div>
  );
}

function Search() {
  const [searchinput, setsearchinput] = useState("");
  const [suggestion, setsuggestion] = useState([]);

  let dataSet = JSON.parse(window.localStorage.getItem("phNum_info"));

  const handlesearchinput = (e) => {
    setsearchinput(e.target.value);
  };

  useEffect(() => {
    const resValue = dataSet.filter((ele) => {
      return (
        ele.name.toLowerCase().includes(searchinput.toLowerCase()) ||
        ele.nickname.toLowerCase().includes(searchinput.toLowerCase()) ||
        ele.contact.includes(searchinput)
      );
    });
    setsuggestion(resValue);
  }, [searchinput, dataSet]);

  return (
    <div className="userSearch">
      <div className="search_bar">
        <input
          type="text"
          name="search"
          placeholder="search"
          onChange={handlesearchinput}
        />
        <button type="submit">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <ul>
        {suggestion.map((ele) => (
          <li>
            <div>{ele.name}</div>
            <div>{ele.nickname}</div>
            <div>{ele.contact}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddContact(props) {
  let { userdata, update } = props;

  const handleuserinput = (e) => {
    const { name, value } = e.target;
    update((olddata) => {
      return { ...olddata, [name]: value };
    });
  };

  const handlebutton = () => {
    const existingData =
      JSON.parse(window.localStorage.getItem("phNum_info")) || [];
    const newData = [];
    newData.push(...existingData, userdata);
    window.localStorage.setItem("phNum_info", JSON.stringify(newData));
  };

  return (
    <div className="ph_form">
      <form>
        <h1>Add Contact</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userdata.name}
          onChange={handleuserinput}
        />
        <input
          type="text"
          name="nickname"
          placeholder="NickName"
          value={userdata.nickname}
          onChange={handleuserinput}
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={userdata.contact}
          onChange={handleuserinput}
        />
        <button className="btn" onClick={handlebutton}>
          Add
        </button>
      </form>
    </div>
  );
}

export default PhoneBook;
