<script>
    import {onMount} from "svelte"
    import {LOG_USER_IN} from "../../actions/auth/index"
    let phone = ''
    let password = ''
    onMount(() => {
        const user = localStorage.getItem('user')
        if (user && user != "undefined") {
            window.location.assign('/account/dashboard')
        }
    })

    const LOGIN = (e) => {
        e.preventDefault()
        document.querySelector(".btn").innerHTML = '<i class="fa fa-spin fa-spinner"></i>';
        const callback = (res) => {
            if(res){
                if(res.status == 'success' && res.proceed == '1'){
                    localStorage.setItem('user', JSON.stringify(res.data))
                    localStorage.setItem('token', JSON.stringify(res.token))
                    if (localStorage.getItem('user')) {
                       document.querySelector(".btn").innerHTML = '<i class="fa fa-check"></i>';
                       setTimeout( () => { window.location.assign('/account/dashboard') }, 1000) 
                    }
                    document.querySelector("#info").innerHTML = `
                        <div class="mb-4 rounded-md bg-green-200 text-green-600 font-bold p-4 border-l-4 border-green-600">Account logged in successfully.</div>
                    `;
                }
                else{
                    document.querySelector(".btn").innerHTML = 'CONTINUE';

                document.querySelector("#info").innerHTML = `
                    <div class="mb-4 rounded-md bg-yellow-200 text-yellow-600 font-bold p-4 border-l-4 border-yellow-600">${res.user.message}</div>
                `;
                }
            }
        }

        const onError = (error) => {
                    document.querySelector(".btn").innerHTML = 'CONTINUE';
            if (error.response) {
                if(error.response.data.data.length == 0 && error.response.data.error == true){
                    document.querySelector("#info").innerHTML = `
                        <div class="mb-4 rounded-md bg-red-200 text-red-600 font-bold p-4 border-l-4 border-red-600">${error.response.data.message}</div>
                    `;
                }
            }
        }
        LOG_USER_IN(phone, password, callback, onError)
    }
  
</script>

<div classs="mt-24 bg-blue-900 m-0 p-4">
    <form class="bg-white rounded-md shadow-md w-10/12 md:w-1/2 lg:w-1/3 m-auto mt-8 p-4 md:p-8" method="POST" on:submit|preventDefault={LOGIN}>
        <div id="info"></div>
        <div class="pb-3 border-b-2 border-gray-200">
            <div class="m-auto bg-gray-900 text-white py-4 px-8 text-center rounded-xl shadow-inner flex items-center justify-center mb-5">
                <div class="inline-block">
                    <div class="font-black text-2xl">G-INTELLIGENCE</div>
                    <div class="font-normal text-md uppercase">Complete School Range Transport System</div>
                </div>
            </div>
        </div>
        <div class="block my-4 p-2">
            <div class="mb-2 text-center text-xl font-bold text-gray-400">
                LOGIN NOW
            </div>
            <div class="text-gray-600 font-normal text-center">
                Please enter your phone number and password to proceed.
            </div>
        </div>
        <div class="block mb-2">
            <input required type="text" id="phone" bind:value={phone} class="border-3 border-gray-100 p-4 rounded-md outline-none w-full" placeholder="Phone Number"/>
        </div>
        <div class="block mb-2">
            <input required type="password" minlength="6" maxlength="8" id="password" bind:value={password} class="border-3 border-gray-100 p-4 rounded-md outline-none w-full" placeholder="Password"/>
        </div>
        <div class="block mt-4">
            <button type="submit" class="btn block w-full bg-blue-600 text-center text-xl font-black text-white p-4 rounded-md">
                CONTINUE
            </button>
        </div>

        <p class="mt-4 p-4 block">
            <span class="text-gray-500">
                Don't have an account?
                <a href="/register" class="text-blue-600 font-bold">Create Account Now..</a>
            </span>
        </p>
        
    </form>
</div>