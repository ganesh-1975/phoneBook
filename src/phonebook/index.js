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

  let dataSet = JSON.parse(window.localStorage.getItem("phNum_info"));

  const handlesearchinput = (e) => {
    setsearchinput(e.target.value);
  };

  useEffect(() => {
    let resValue;
    let mt = "";
    if (searchinput == mt) {
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

      
      const updatedDataSet = [...dataSet];

      updatedDataSet.splice(index, 1); 
    
      
      window.localStorage.setItem("phNum_info", JSON.stringify(updatedDataSet));
    
      
      setsuggestion(updatedDataSet);
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
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <ul>
        {suggestion.map((ele, ind) => (
          <li key={ind}>
            <div>{ele.name}</div>
            <div>{ele.nickname}</div>
            <div>{ele.contact}</div>
            <div className="delete_btn" onClick={() => handleDelete(ind)}>Delete</div>
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
    const existingData =
      JSON.parse(window.localStorage.getItem("phNum_info")) || [];
    existingData.push(userdata);
    window.localStorage.setItem("phNum_info", JSON.stringify(existingData));
    alert("Contact Saved");
    setcontactSaved("Contact Saved ✅");
    setTimeout(() => {
      setcontactSaved("");
    }, 3000);
    update({
      name: "",
      nickname: "",
      contact: "",
    });
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
          maxLength={12}
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
