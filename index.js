const loadPhone=(searchText,dataLimit)=>{
    const URL =` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(URL)
    .then(res => res.json())
    .then(data=>showPhone(data.data,dataLimit));

}
const showPhone = (data,dataLimit) =>{
    // console.log(data.data);
    const phonContainer = document.getElementById('phone-container')
    phonContainer.innerHTML='';
    const btnShow = document.getElementById('btn-showmore')
    if(dataLimit && data.length > 10){
        // display 10 phones-------------------------------------------------
        data=data.slice(0,10);
        btnShow.classList.remove('hidden')
    }else{
        btnShow.classList.add('hidden');
    }

    // warninng msg----------------------------------
    const warn = document.getElementById('warning-msg');
    if(data.length==0){
        warn.classList.remove('hidden');
    }else{
        warn.classList.add('hidden');
    }



    data.forEach(phone =>{
        // console.log(phone);
       
        const div = document.createElement('div');
        div.classList.add('card-body');
        div.innerHTML=`
    <figure><img src="${phone.image}"/></figure>
        <h2 class="card-title">Phone Name:${phone.phone_name}</h2>
        <p>Brand:${phone.brand}</p>
      
        <div class="card-actions">
        <label onclick="loadSinglePhone('${phone.slug}')" for="my-modal-3" class="btn">open modal</label>
    
      </div>
        `
        phonContainer.appendChild(div);
    });
    toggleLoader(false);
   
}

// search/button handler-----------------------------------
const progressSearch =(dataLimit)=>{
    toggleLoader(true)
    const inputField= document.getElementById('input-field');
    const inputValue =inputField.value;
     loadPhone(inputValue,dataLimit);
}
document.getElementById('btn-search').addEventListener('click',function(){

   progressSearch(10);
})

document.getElementById('input-field').addEventListener('keyup',function(e){

    if(e.key==='Enter'){
       
        progressSearch(10);
    }
   
})
document.getElementById('btn-showmore').addEventListener('click',function(){
    progressSearch();
 });

//  spinner-------------------------------
const loader = document.getElementById('loader');
 const toggleLoader =isloading=>{
    if(isloading){
loader.classList.remove('hidden')
    }else{
        loader.classList.add('hidden');
    }
 }


// 2nd API Call for modal----------------------------------------------------------

const loadSinglePhone=id=>{
    const URL2 = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(URL2)
    .then(res=>res.json())
    .then(data=>displayModal(data.data))
}


const displayModal=data=>{
   
    // console.log(data.name);

    const modalInfo = document.getElementById('modal');
   const modalDetails=`
   
      <div class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <figure><img src="${data.image}"/></figure>
        <h3 class="text-lg font-bold">${data.name}</h3>
        <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
     
</div>
    `;
    modalInfo.innerHTML=modalDetails;

  
};

// loadPhone('iphone');