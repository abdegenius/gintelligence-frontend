
<script>
    import {onMount} from "svelte"
    import { __serialize, __deserialize } from '../../../helpers/index'
    import { SEND, MESSAGES } from "../../../actions/commands/index"
    import axios from "axios"
    let user = null
    let token = null
    const userData = __deserialize('user')
    const tokenData = __deserialize('token')
    if(userData && tokenData){
        user = userData
        token = tokenData
    }
    else{
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('token')
        window.location.assign('/login')
    }

    onMount(() => {
        MSGS()
    })
    
    let messageBody = document.querySelector('.messages');
    if(messageBody){
        messageBody.scrollTop = messageBody.scrollHeight;
    }
    
    const updateScroll = () => {
        let element = document.querySelector("#messageBox");
        if(element){
            element.scrollTop = element.scrollHeight;
        }
    }
    const MSGS = () => {
        const callback = (res) => {
            if(res){
                if(res.status == 'success' && res.proceed == 1){
                    let box = document.querySelector(".messages");
                    box.innerHTML = '';
                    let datas = res.data
                    for(let i=datas.length - 1;i>=0;i--){
                        box.innerHTML += (datas[i].sys == '1' ? `<div class="w-full rounded-md bg-gray-200 mb-4 p-4 text-gray-600 font-normal">${datas[i].message}
                        </div>` : `<div class="w-full rounded-md bg-blue-900 mb-4 p-4 text-gray-100 font-normal text-right">
                            ${datas[i].message}
                        </div>`);
                    }
                   updateScroll()
                }
            }
        }
        const onError = (error) => {
        }
        MESSAGES(callback, onError)
    }

    let message = ''
    const SUBMIT = (e) => {
        e.preventDefault()
        const callback = (res) => {
            if(res){
                if(res.status == 'success'){
                    MSGS()
                    document.querySelector("#info").innerHTML = `
                        <div class="mb-4 rounded-md bg-green-200 text-green-600 font-bold p-4 border-l-4 border-green-600">Sent.</div>
                    `;
                    message = ''
                }
                document.querySelector("#info").innerHTML = `
                    <div class="mb-4 rounded-md bg-yellow-200 text-yellow-600 font-bold p-4 border-l-4 border-yellow-600">${res.message}</div>
                `;
            }
        }
        const onError = (error) => {
            if (error.response) {
                if(error.response.data.data.length == 0 && error.response.data.error == true){
                    document.querySelector("#info").innerHTML = `
                        <div class="mb-4 rounded-md bg-red-200 text-red-600 font-bold p-4 border-l-4 border-red-600">${error.response.data.message}</div>
                    `;
                }
            }
        }
        SEND(message, callback, onError)
    }
</script>

<div class="w-full min-h-screen mt-16 p-0 bg-blue-50">

    <div class="bg-blue-900 w-full h-32">
        <div class="flex p-4 justify-start items-center">
            <div class="flex items-center rounded-full w-8 h-8 md:w-20 md:h-20 bg-black text-sm md:text-xl text-white text-center p-2">
                <div class="text-center font-bold m-auto">G!</div>
            </div>
            <div class="m-2 p-2">
                <h4 class="text-sm md:text-xl font-normal text-white">G-INTELLIGENCE</h4>
                <p class="uppercase text-xs md:text-md text-gray-200">Your all-in-one transport and billing solution</p>
                <div class="text-sm text-gray-300">
                    <div class="rounded-full w-2 h-2 p-1 bg-green-600 inline-block"></div>
                    Online
                </div>
            </div>
        </div>
    </div>

    <div class="overflow-y-scroll p-4 h-auto relative">

    <div class="messages" id="messageBox"></div>

    </div>

    <div class="fixed bottom-0 w-full block bg-gray-200 border-t border-gray-400 p-4">
        <div id="info"></div>
        <form method="POST" on:submit|preventDefault={SUBMIT} class="flex justify-center items-center m-auto">
            <div class="w-2/3 mb-4">
                <input type="text" bind:value={message} placeholder="Enter a command" class="w-full rounded-l-md border border-gray-200 p-4 text-gray-600 h-12 outline-none">
            </div>
            <div class="w-1/3 mb-4">
                <button type="submit" class="rounded-r-md bg-blue-900 text-white py-2 px-4 h-12">
                    <i class="fa fa-arrow-right"></i>
                </button>
            </div>
        </form>
    </div>

</div>