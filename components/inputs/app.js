const previewImage = document.getElementById("previewImg");
const input = document.querySelector("input");

function handlePreview() {
	let reader = new FileReader();

	previewImage.setAttribute("alt", "Carregando....");

	setTimeout(() => {
		if (input.files && input.files[0]) {
			reader.onload = (e) => {
				previewImage.setAttribute("src", e.target.result);
			};

			reader.readAsDataURL(input.files[0]);
		}
	}, 3000);
}


handleColors = ()=>{
    const text = document.querySelector("p");
    const colors = document.getElementById("colors");
    
    console.log(colors.value);
    text.style = `color:${colors.value}`;
}
