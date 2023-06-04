
import userEvent from '@testing-library/user-event';
import React, { useEffect, useState }  from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Updateuser =() =>{
    const [updateData, setUpdateData] =useState({});
    const [fileUpdateurl, setFilUpdateeurl] = useState({});
    const [infoUpdate, setInfoUpdate] = useState({});
    const {id} =useParams()

    const handleBlur = e =>{
        const newinfo = {...infoUpdate};
        newinfo[e.target.name] = e.target.value ;
        setInfoUpdate(newinfo);
      }


    const handleSubmit=(event) =>{
        
        const formUpdateData ={
          name: infoUpdate.name,
          price:infoUpdate.price,
          img:fileUpdateurl
        }
        console.log(formUpdateData)
      const url=`http://localhost:4000/update/${id}`
        fetch(url, {
          method: 'PUT',
          headers:{ 
            "content-type": "Application/json"
        },
          body: JSON.stringify(formUpdateData),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          alert('successfully upadated!!!');
          event.target.reset();
     
        })
        .catch(error => {
          console.error(error)
        })
      }

      //image uplaoda on img bb
      const handleUpdateChangeFile = (event) =>{

        const newFile =event.target.files[0];
        const imageData = new FormData();
        imageData.set('key','853e97531b1ffe7f171c6f1ca287e3f0');
       
        imageData.append('image',event.target.files[0]);
    
        axios.post('https://api.imgbb.com/1/upload',
        imageData)
        .then(function (response) {
            setFilUpdateeurl(response.data.data.display_url);
        })
        .catch(function (error) {
          console.log(error);
        });
    
        
      }
    useEffect( () =>{
        
      const url =`http://localhost:4000/Products/${id}`
      fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUpdateData(data)
      })
    },[])
    
    return (
       
        <div>
        
  <br/>
  <br/>
        <h1 class='text-center text-danger'><strong>update Cart Details </strong></h1>
        <br/>
        <div class="row container text-center">
        <div class="col-12 col-md-8">
        <h2 class='text-success'><strong>Product Name : {updateData.name}</strong></h2>
        <h2 class='text-success'><strong> Product price:<span>   </span>{updateData.price}</strong><span>tk</span></h2>
       
        </div>
       <div class="col-6 col-md-4">
       <img class="rounded float-right img-thumbnail"  src={updateData.image}></img>
       </div>
        
          </div>
          <br/> <br/>
        <form onSubmit={handleSubmit}
      class="container ">
      
      
      

        <div class="form-group ">
          
         
          <input onChange={handleBlur} type="text" name='name' class="form-control" id="products"placeholder="Product Name"/>
         
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Price</label>
          <input onChange={handleBlur}  type="number" name='price' class="form-control" id="price" placeholder="Price"/>
          <br/>
        </div>
     
        <div class="form-group">
           
            <input type="file" onChange={handleUpdateChangeFile}  class="form-control-file" id="image" name="avatar" />
          </div>
          <br/>
        
         <button  id="addUser" type="submit" class="btn btn-primary">Submit</button>

      </form>
      <br/>
      <div class='text-center'>
      <Link to={'/'}>
         <button  id="addUser" type="submit" class="btn btn-primary"><span>	🡨</span> Back to the Database</button>
      </Link>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
   
    
        </div>
    );
};
export default Updateuser;