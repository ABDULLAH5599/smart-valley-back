
import React , { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home =() =>{
    
  const [info, setInfo] = useState({});
  const [fileurl, setFileurl] = useState({});
  const [loadData, setLoadData] = useState([]);
  const [updateData, setUpdateData] =useState([]);
console.log(loadData)
useEffect( () =>{
  fetch('http://localhost:4000/Products')
  .then(res => res.json())
  .then(data => {
    setLoadData(data);
      
  });
},[])

  const handleBlur = e =>{
    const newinfo = {...info};
    newinfo[e.target.name] = e.target.value ;
    setInfo(newinfo);
  }

  const handleChangeFile = (event) =>{

    const newFile =event.target.files[0];
    const imageData = new FormData();
    imageData.set('key','853e97531b1ffe7f171c6f1ca287e3f0');
   
    imageData.append('image',event.target.files[0]);

    axios.post('https://api.imgbb.com/1/upload',
    imageData)
    .then(function (response) {
      setFileurl(response.data.data.display_url);
    })
    .catch(function (error) {
      console.log(error);
    });

    
  }

  const handleSubmit=() =>{
    const formData ={
      name: info.name,
      price:info.price,
      img:fileurl
    }
  console.log(formData)
    fetch('http://localhost:4000/addProducts', {
      method: 'POST',
      headers:{ "content-type": "Application/json; charset=UTF-8"},
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
  }

  const handleDeleteId = (id) =>{

    const proceed = window.confirm('Are you sure?')
    if(proceed){
      const url=`http://localhost:4000/delete/${id}`;
      fetch(url,{
        method:'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
    const remaining= loadData.filter(data => data._id !==id);
        setLoadData(remaining)
      })
    }
    console.log(id)
  }

//   const handleUpdateId =(id)=>{
//     console.log(id)
//     const takeData =  loadData.find(data => data._id ===id);
//     console.log(takeData)
//     setUpdateData(takeData)
//     // useEffect( () =>{
//     //   const url=`http://localhost:4000/addProducts/${id}`;
  
//     //   fetch(url)
//     //   .then(res => res.json())
//     //   .then(data => {
//     //     console.log(data)
       
//     //     setUpdateData(data)
//     //   })
//     // } ,[])
//   }

  return (

    
    <div className="App">
      <br/>
  <br/>
  <br/>
  <h1 class="text-center text-danger"> SMART VALLEY BACKEND</h1>
  <br/>
      <form onSubmit={handleSubmit}
      class="container ">
      
      
      

        <div class="form-group ">
          <label for="exampleInputEmail1">Product Name </label>
          <input onBlur={handleBlur} type="text" name='name' class="form-control" id="products"placeholder="Product Name"/>
         
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Price</label>
          <input onBlur={handleBlur} type="number" name='price' class="form-control" id="price" placeholder="Price"/>
          <br/>
        </div>
     
        <div class="form-group">
           
            <input onChange={handleChangeFile} type="file" class="form-control-file" id="image" name="avatar" />
          </div>
          <br/>
        <button  id="addUser" type="submit" class="btn btn-primary">Submit</button>
      </form>
       <h1 class="text-center text-danger"> Cart Details</h1>
        <h3  class="text-center text-primary"> Total product : {loadData.length}</h3>
    {
      loadData.map(data => <div class="text-center">
      <div class="container">
    <div class="row">
    <div class="col-sm">
    <h2 >{data.name}</h2>
    </div>
    <div class="col-sm">
    <h2 >{data.price}</h2>
    </div>
    <div class="col-sm">
    <button onClick={() => handleDeleteId(data._id)} class="text.danger">DELETE</button>
   
    </div>
    <div class="col-sm">
    <Link to={`/update/${data._id}`}>
 
    <button  class="text.danger">UPDATE</button>
    </Link>
    </div>
    
  </div>
</div>


      </div>)
     
    }

   <div>

   </div>

      
      
       
      
 <br/>
 <br/>
 <br/>
    </div>
  );
}

export default Home;
