<script>
    import {onMount} from "svelte"
    import { __serialize, __deserialize } from '../../../helpers/index'
    import { BALANCE, GENERATE, TICKETS } from "../../../actions/user/index"
    import axios from "axios"
    let user = null
    let tickets = null
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
        GET_TICKETS()
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
    const GET_TICKETS = () => {
        const callback = (res) => {
            if(res){
                if(res.status == 'success' && res.proceed == 1){
                    tickets = res.data
                }
            }
        }
        const onError = (error) => {
        }
        TICKETS(callback, onError)
    }


    let amount = ''
    const SUBMIT = (e) => {
        e.preventDefault()
        const callback = (res) => {
            if(res){
                if(res.status == 'success'){
                    document.querySelector("#info").innerHTML = `
                        <div class="mb-4 rounded-md bg-green-200 text-green-600 font-bold p-4 border-l-4 border-green-600">${res.message}</div>
                    `;
                    amount = ''
                }
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
        GENERATE(amount, callback, onError)
    }

    
</script>
    <div class="w-full bg-blue-50 min-h-screen mt-16 p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-4 rounded-md">
            <div class="bg-green-500 rounded-md shadow-md px-4 py-8 mb-4">
                <div class="text-xl mb-2 text-left font-bold text-white">&#8358;{wallet_balance ? wallet_balance : "0"}</div>
                <div class="text-right mb-2 text-sm uppercase text-white font-light">
                    <i class="fa fa-wallet"></i>&nbsp; AVAILABLE BALANCE
                </div>
            </div>

            <div class="bg-gray-100 rounded-md shadow-md px-4 py-8 mb-4">
                <div class="mt-6 bg-gray-50 p-4 rounded-md">
                    

                
                    <div class="bg-blue-100 p-4 rounded-md border border-blue-100">
                        <p class="text-gray-600 font-bold border-b border-gray-200 pb-4">Generate a ticket from wallet balance.</p>
                       
                        <form method="POST" on:submit|preventDefault={SUBMIT} class="mt-4">
                            <div id="info"></div>
                            <div class="block mb-2">
                                <input type="text" bind:value={amount} class="border-3 border-gray-100 p-4 rounded-md outline-none w-full" placeholder="Enter Ticket Value in naira"/>
                            </div>
                            <div class="block mt-4">
                                <button type="submit" class="block w-full bg-blue-600 text-center text-xl font-semibold text-white p-4 rounded-md">
                                    Generate
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </div>
        <div>
         


            <div class="bg-gray-50 mt-4 p-4 rounded-md">
                <b class="font-bold text-lg text-gray-500">My Tickets</b>
                <ul class="overflow-x-scroll ">
                    <li class="mb-4 p-4 border-b-2 border-gray-100 flex justify-between font-bold">
                        <div>...</div>
                        <div>Date</div>
                        <div>Amount(&#8358;)</div>
                        <div class="hidden md:block">Code</div>
                        <div>Status</div>
                    </li>

                    {#await tickets}
                        <p class="p-4">loading..</p>
                    {:then data} 
                        {#if data && data.length > 0}

                        {#each data as h}

                        <li class="mb-4 p-4 border-b-2 border-gray-100 flex justify-between font-bold">
                            <td><a href="https://chart.googleapis.com/chart?cht=qr&chl={h.ticket_number}&chs=350x300&choe=UTF-8" class="mr-4 cursor-pointer">
                                <i class="fa text-red-500 fa-qrcode"></i>
                            </a> </td>
                            <div>{h.created_at.substring(0,10)}</div>
                            <div>&#8358;{h.amount}</div>
                            <div class="hidden md:block">{h.ticket_number}</div>
                            <div>{h.status}</div>
                        </li>

                        {/each}

                        {/if}
                    {/await}
                </ul>
            </div>

        </div>
    </div>
</div>
