import "./index.css";
import { useState, useEffect } from "react";

function PhoneBook() {
  const userdata = {};

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
  const [contactDeleted, setcontactDeleted] = useState("");

  let dataSet = JSON.parse(window.localStorage.getItem("phNum_info"));

  const handlesearchinput = (e) => {
    setsearchinput(e.target.value);
  };

  useEffect(() => {
    let resValue;
    let mt = "";
    if (searchinput === mt) {
      resValue = [];
    } else {
      resValue = dataSet.filter((ele) => {
        return (
          ele.name.toLowerCase().includes(searchinput.toLowerCase()) ||
          ele.nickname.toLowerCase().includes(searchinput.toLowerCase()) ||
          ele.contact.toString().includes(searchinput)
        );
      });

      // let index = resValue.findIndex(ele => ele.name.toLowerCase() === searchinput.toLowerCase())
      // console.log(index)
    }

    setsuggestion(resValue);
  }, [searchinput]);

  function handleDelete(index) {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const updatedDataSet = [...dataSet];

      updatedDataSet.splice(index, 1);

      window.localStorage.setItem("phNum_info", JSON.stringify(updatedDataSet));

      setcontactDeleted("Contact Deleted ❌");
      setTimeout(() => {
        setcontactDeleted("");
      }, 2000);

      setsuggestion(updatedDataSet);
    }
  }

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>

      <h3 className="acknowlegeForDelete">{contactDeleted}</h3>
      <ul>
        {suggestion.map((ele, ind) => (
          <li key={ind}>
            <div>{ele.name}</div>
            <div>{ele.nickname}</div>
            <div>{ele.contact}</div>
            <div className="delete_btn" onClick={() => handleDelete(ind)}>
              Delete
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddContact(props) {
  let { userdata, update } = props;

  const [contactSaved, setcontactSaved] = useState("");

  const handleuserinput = (e) => {
    const { name, value } = e.target;
    update((olddata) => {
      return { ...olddata, [name]: value };
    });
  };

  const handlebutton = (e) => {
    e.preventDefault();
    const existingData = JSON.parse(window.localStorage.getItem("phNum_info")) || [];
    const contactExist = existingData.some(
      (ele) => ele.contact === userdata.contact
    );
    if (contactExist) {
      alert("the conctact already saved");
    } else {
      existingData.push(userdata);
      window.localStorage.setItem("phNum_info", JSON.stringify(existingData));
      alert("Contact Saved");
      setcontactSaved("Contact Saved ✅");
      setTimeout(() => {
        setcontactSaved("");
      }, 2000);
      update({
        name: "",
        nickname: "",
        contact: "",
      });
    }
  };

  return (
    <div className="ph_form">
      <form onSubmit={handlebutton}>
        <h1>Add Contact</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userdata.name}
          required
          onChange={handleuserinput}
        />
        <input
          type="text"
          name="nickname"
          placeholder="NickName"
          value={userdata.nickname}
          required
          onChange={handleuserinput}
        />
        <input
          type="tel"
          minLength={10}
          maxLength={13}
          name="contact"
          placeholder="Contact Number"
          value={userdata.contact}
          required
          onChange={handleuserinput}
        />
        <button type="submit" className="btn">
          Add
        </button>
      </form>
      <h1 className="acknowledge">{contactSaved}</h1>
    </div>
  );
}

export default PhoneBook;
