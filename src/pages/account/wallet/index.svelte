<script>
    import {onMount} from "svelte"
    import { __serialize, __deserialize } from '../../../helpers/index'
    import { BALANCE, SAVE_VIRTUAL_ACCOUNT, VIRTUAL_ACCOUNT, TOPUP, LOAD, HISTORY, TICKETS } from "../../../actions/user/index"
    import axios from "axios"
    let user = null
    let bvn = ''
    let nuban = ''
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
    let history = null
    let virtual_account = null
    let tickets = null
    onMount(async() => {
        GET_BALANCE()
        GET_VIRTUAL_ACCOUNT()
        GET_HISTORY()
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

    const GET_VIRTUAL_ACCOUNT = () => {
        const callback = (res) => {
            if(res){
                if(res.status == 'success'){
                    virtual_account = res
                }
            }
        }
        const onError = (error) => {
        }
        VIRTUAL_ACCOUNT(callback, onError)
    }

    const GET_HISTORY = () => {
        const callback = (res) => {
            if(res){
                if(res.status == 'success' && res.proceed == 1){
                    history = res.data
                }
            }
        }
        const onError = (error) => {
        }
        HISTORY(callback, onError)
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
    let ticket_number = ''
    const SUBMIT = (e) => {
        e.preventDefault()
        const callback = (res) => {
            if(res){
                if(res.status == 'success'){
                    window.location.assign(res.data)
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
        TOPUP(amount, callback, onError)
    }

    const SBT = (e) => {
        e.preventDefault()
        const callback = (res) => {
            if(res){
                if(res.status == 'success'){
                    document.querySelector("#info").innerHTML = `
                        <div class="mb-4 rounded-md bg-yellow-200 text-yellow-600 font-bold p-4 border-l-4 border-yellow-600">${res.message}</div>
                    `;
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
        LOAD(ticket_number, callback, onError)
    }

    const GENERATE_VIRTUAL_ACCOUNT = async() => {
        let res = await fetch(`https://fsi.ng/api/woven/vnubans/create_customer`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "sandbox-key": "0KDc0NGPKaK9TJDW23qXKma6NzIKXfl81634140240",
                'api-secret': 'vb_ls_bfac75fe54a952841971b6918d06aeb2659523dc92d6'
            },
            body: JSON.stringify({
                "customer_reference": user.id,
                "name": user.name,
                "email": user.email,
                "mobile_number": user.phone,
                "expires_on": "2025-01-01",
                "use_frequency": "100",
                "min_amount": 500,
                "max_amount": 10000
            }),
        });
        res = await res.json()
        if(res){
            if(res.status == 'success'){
                const callback = (res) => {
                    if(res){
                        if(res.status == 'success'){
                            document.querySelector("#info").innerHTML = `
                                <div class="mb-4 rounded-md bg-yellow-200 text-yellow-600 font-bold p-4 border-l-4 border-yellow-600">${res.message}</div>
                            `;
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
                SAVE_VIRTUAL_ACCOUNT(bvn, res.data.bank_name, res.data.bank_code, res.account_name, res.data.vnuban, callback, onError)
            }
        }
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
                <b class="font-bold text-lg text-gray-500">Topup Wallet Now</b>
                <div class="my-4 flex justify-between items-center">
                    <div class="bg-white text-center font-bold text-sm xl:text-lg w-full mb-4 p-4 rounded-t-md border-b-4 border-blue-600 pb-4 cursor-pointer"> Self-Topup</div>
                    <div class="w-full text-center font-bold text-sm xl:text-lg mb-4 border-b-4 p-4 border-gray-400 pb-4 cursor-pointer"><a href="/account/wallet/thirdparty-topup"> Thirdparty-Topup</a></div>
                </div>

                <div class="mt-6 bg-gray-50 p-4 rounded-md">
                    <div class="bg-gray-100 p-4 rounded-md mb-4 border border-blue-100">
                        <p class="text-gray-600 font-bold border-b border-gray-200 pb-4">Your Virtual Account</p>
                        {#if virtual_account && virtual_account.proceed == '1'}
                        <ul>
                            <li class="flex justify-between items-center my-4">
                                <div class="mr-5"><b>Bank Name</b></div>
                                <div><span class="text-gray-600 italic">{virtual_account.data.bank_name}</span></div>
                            </li>
                            <li class="flex justify-between items-center my-4">
                                <div class="mr-5"><b>Account Name</b></div>
                                <div><span class="text-gray-600 italic">{virtual_account.data.account_name}</span></div>
                            </li>
                            <li class="flex justify-between items-center my-4">
                                <div class="mr-5"><b>Account Number</b></div>
                                <div><span class="text-gray-600 italic">{virtual_account.data.account_number}</span></div>
                            </li>
                        </ul>
                        {:else}
                        <form method="POST" on:submit|preventDefault={GENERATE_VIRTUAL_ACCOUNT} class="mt-4">
                            <p class="text-gray-500 font-bold mb-4">
                                Ouch! It appears you don't have a virtual account yet, enter your BVN and NUBAN account number below to generate a virtual account.
                            </p>
                            <div class="block mb-2">
                                <input type="number" bind:value={bvn} class="border-3 border-gray-100 p-4 rounded-md outline-none w-full" placeholder="Enter your BVN"/>
                            </div>
                            <div class="block mb-2">
                                <input type="number" bind:value={nuban} class="border-3 border-gray-100 p-4 rounded-md outline-none w-full" placeholder="Enter your NUBAN"/>
                            </div>
                            <div class="block mt-4">
                                <button type="submit" class="block w-full bg-blue-600 text-center text-xl font-semibold text-white p-4 rounded-md">
                                    Proceed
                                </button>
                            </div>
                        </form>
                        {/if}
                    </div>

                    <div class="bg-gray-100 p-4 rounded-md border border-blue-100">
                        <p class="text-gray-600 font-bold border-b border-gray-200 pb-4">Enter the amount you want to topup below.</p>
                       
                        <form method="POST" on:submit|preventDefault={SUBMIT} class="mt-4">
                            <div id="info"></div>
                            <p class="text-green-600 bg-green-100 p-4 font-bold mb-4">
                                Please enter amount you want to topup below and select the payment mode (Card payment or Bank Transfer)
                            </p>
                            <div class="block mb-2">
                                <input type="text" bind:value={amount} class="border-3 border-gray-100 p-4 rounded-md outline-none w-full" placeholder="Enter Amount"/>
                            </div>
                            <div class="block mb-2">
                                <select class="border-3 border-gray-100 p-4 rounded-md outline-none w-full">
                                    <option value="card">Card payment</option>
                                    <!-- <option value="bank">Bank Transfer</option> -->
                                </select>
                            </div>
                            <div class="block mt-4">
                                <button type="submit" class="block w-full bg-blue-600 text-center text-xl font-semibold text-white p-4 rounded-md">
                                    Topup Now
                                </button>
                            </div>
                        </form>
                    </div>

                    <div class="bg-blue-300 p-4 mt-4 rounded-md border border-blue-100">
                        <p class="text-gray-600 font-bold border-b border-gray-200 pb-4">Topup wallet using ticket.</p>
                       
                        <form method="POST" on:submit|preventDefault={SBT} class="mt-4">
                            <div id="info"></div>
                            <div class="block mb-2">
                                <input type="text" bind:value={ticket_number} class="border-3 border-gray-100 p-4 rounded-md outline-none w-full" placeholder="Enter Ticket Number"/>
                            </div>
                            <div class="block mt-4">
                                <button type="submit" class="block w-full bg-blue-600 text-center text-xl font-semibold text-white p-4 rounded-md">
                                    Load Now
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </div>
        <div>
            <div class="bg-gray-50 p-4 rounded-md">
                <b class="font-bold text-lg text-gray-500">Self Topup History</b>
                <ul class="overflow-x-scroll ">
                    <li class="mb-4 p-4 border-b-2 border-gray-100 flex justify-between font-bold">
                        <div>Date</div>
                        <div>Amount(&#8358;)</div>
                        <div class="hidden md:block">Method</div>
                        <div>Status</div>
                    </li>

                    {#await history}
                        <p class="p-4">loading..</p>
                    {:then data} 
                        {#if data && data.length > 0}

                        {#each data as h}

                        <li class="mb-4 p-4 border-b-2 border-gray-100 flex justify-between font-bold">
                            <div>{h.created_at.substring(0,10)}</div>
                            <div>&#8358;{h.amount}</div>
                            <div class="hidden md:block">{h.method}</div>
                            <div>{h.status}</div>
                        </li>

                        {/each}

                        {/if}
                    {/await}

                    
                </ul>
            </div>


            <div class="bg-gray-50 mt-4 p-4 rounded-md">
                <b class="font-bold text-lg text-gray-500">My Tickets</b>
                <ul class="overflow-x-scroll ">
                    <li class="mb-4 p-4 border-b-2 border-gray-100 flex justify-between font-bold">
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
