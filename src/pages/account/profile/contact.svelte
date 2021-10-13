<script>
    import {onMount} from "svelte"
    import { __serialize, __deserialize } from '../../../helpers/index'
    import { BALANCE, CONTACT } from "../../../actions/user/index"
    import axios from "axios"
    let user = null
    const userData = __deserialize('user')
    if(userData){
        user = userData
    }
    else{
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('token')
        window.location.assign('/login')
    }
    let wallet_balance = null
    onMount(async() => {
        GET_BALANCE()
    })
    
    const GET_BALANCE = () => {
        const callback = (res) => {
            if(res){
                if(res.status == 'success' && res.proceed == 1){
                    wallet_balance = res.data.wallet_balance
                }
            }
        }
        const onError = (error) => {
        }
        BALANCE(callback, onError)
    }
    let address = user.contact
    const SUBMIT = (e) => {
        e.preventDefault()
        const callback = (res) => {
            if(res){
                if(res.status == 'success' && res.proceed == 1){
                    window.localStorage.removeItem("user")
                    window.localStorage.setItem("user", JSON.stringify(res.data))
                    document.querySelector("#info").innerHTML = `
                        <div class="mb-4 rounded-md bg-green-200 text-green-600 font-bold p-4 border-l-4 border-green-600">Account updated successfully.</div>
                    `;
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
        CONTACT(address, callback, onError)
    }
</script>

<div class="w-full bg-blue-50 min-h-screen mt-16 p-4">

    <div class="block lg:flex justify-start items-start">
        <div class="w-12/12 lg:w-1/3 rounded-md shadow-inner bg-gray-50 p-4">
            <div class="m-auto flex justify-center items-center text-center w-28 h-28 rounded-full text-white text-xl uppercase font-bold bg-blue-600">
                {user.name.substring(0,1)}
            </div>
            <div class="mt-4 text-gray-500 font-semibold text-xl text-center">{user.name}</div>
            <p class="mb-6 mt-2 text-sm text-gray-400 text-center">Member since {user.created_at}</p>

            <div class="mt-4 flex justify-center">
                <div class="bg-red-600 rounded-md py-2 px-4 font-light text-white no-underline">Log Out</div>
            </div>

            <div class="bg-green-500 rounded-md shadow-md p-4 mt-5">
                <p class="text-sm text-white font-normal">Current balance</p>
                <div class="text-2xl mb-2 text-left font-bold text-white">&#8358;{wallet_balance ? wallet_balance : '0'}</div>
                <div class="flex justify-end items-center">
                    <div class="mt-4">
                        <a href="/account/wallet"><div class="bg-gray-600 rounded-md py-2 px-4 font-light text-white no-underline">Topup now</div></a>
                    </div>
                </div>
            </div>

        </div>

        <div class="w-12/12 lg:ml-6 lg:w-2/3">
            <div class="flex flex-row items-center justify-start overflow-x-scroll">
                <div class="text-gray-500 font-semibold p-4 m-2 cursor-pointer hover:bg-gray-200 hover:text-blue-600 rounded-md hover:shadow-md"><a href="/account/profile">Personal</a></div>
                <div class="font-semibold p-4 m-2 cursor-pointer bg-white text-blue-600 rounded-md shadow-md"><a href="/account/profile/contact">Contact</a></div>
                <div class="text-gray-500 font-semibold p-4 m-2 cursor-pointer hover:bg-gray-200 hover:text-blue-600 rounded-md hover:shadow-md"><a href="/account/profile/security">Security</a></div>
            </div>

            <div class="block mt-4 bg-gray-50 p-8">
                <div id="info"></div>
                <form method="POST" on:submit|preventDefault={SUBMIT}>
                    <div class="mb-4 p-2 block">
                        <label for="address" class="text-sm mb-2 text-gray-600 font-normal">Address</label>
                        <textarea rows=4 id="address" bind:value={address} class="border-3 border-gray-100 p-4 rounded-md outline-none w-full"></textarea>
                    </div>
                    <div class="block mt-4 p-2">
                        <button type="submit" class="block w-full bg-blue-600 text-center text-xl font-black text-white p-4 rounded-md">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </div>

</div>