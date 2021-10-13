<script>
    import {onMount} from "svelte"
    import { __serialize, __deserialize } from '../../../helpers/index'
    import { BALANCE, VIRTUAL_ACCOUNT } from "../../../actions/user/index"
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
    let virtual_account = null
    onMount(async() => {
        GET_BALANCE()
        GET_VIRTUAL_ACCOUNT()
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
                    virtual_account = res.data
                }
            }
        }
        const onError = (error) => {
        }
        VIRTUAL_ACCOUNT(callback, onError)
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
                                <div><span class="text-gray-600 italic">Access Bank</span></div>
                            </li>
                            <li class="flex justify-between items-center my-4">
                                <div class="mr-5"><b>Account Name</b></div>
                                <div><span class="text-gray-600 italic">Bamanja Johnnie</span></div>
                            </li>
                            <li class="flex justify-between items-center my-4">
                                <div class="mr-5"><b>Account Number</b></div>
                                <div><span class="text-gray-600 italic">0799605419</span></div>
                            </li>
                        </ul>
                        {:else}
                        <form method="" class="mt-4">
                            <p class="text-gray-500 font-bold mb-4">
                                Ouch! It appears you don't have a virtual account yet, enter your BVN and NUBAN account number below to generate a virtual account.
                            </p>
                            <div class="block mb-2">
                                <input type="text" id="" class="border-3 border-gray-100 p-4 rounded-md outline-none w-full" placeholder="enter your BVN"/>
                            </div>
                            <div class="block mb-2">
                                <input type="password" minlength="6" maxlength="8" id="" class="border-3 border-gray-100 p-4 rounded-md outline-none w-full" placeholder="enter your NUBAN"/>
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
                       
                        <form method="" class="mt-4">
                            <p class="text-green-600 bg-green-100 p-4 font-bold mb-4">
                                Please enter amount you want to topup below and select the payment mode (Card payment or Bank Transfer)
                            </p>
                            <div class="block mb-2">
                                <input type="text" id="" class="border-3 border-gray-100 p-4 rounded-md outline-none w-full" placeholder="Enter Amount"/>
                            </div>
                            <div class="block mb-2">
                                <select id="" class="border-3 border-gray-100 p-4 rounded-md outline-none w-full">
                                    <option value="card">Card payment</option>
                                    <option value="bank">Bank Transfer</option>
                                </select>
                            </div>
                            <div class="block mt-4">
                                <button type="submit" class="block w-full bg-blue-600 text-center text-xl font-semibold text-white p-4 rounded-md">
                                    Topup Now
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
                        <div class="hidden md:block">Remarks</div>
                        <div>Status</div>
                    </li>

                    <li class="mb-4 p-4 border-b-2 border-gray-100 flex justify-between font-bold">
                        <div>2021-04-02</div>
                        <div>&#8358;10,000</div>
                        <div class="hidden md:block">09000000645/topup</div>
                        <div>successful</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
