const bAdd = document.querySelector('#bAdd') as HTMLButtonElement;

bAdd.addEventListener('click',e=>{
    alert('Todo bien todo correcto');
    document.querySelector('#display').textContent = "hola mundo";
});