<script>
    import {onMount} from "svelte"
    import { __serialize, __deserialize } from '../../../helpers/index'
    import { DASHBOARD } from "../../../actions/user/index"
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
    let income = null
    let spending = null
    onMount(async() => {
        GET_DASHBOARD()
    })
    
    const GET_DASHBOARD = () => {
        const callback = (res) => {
            if(res){
                if(res.status == 'success' && res.proceed == 1){
                    wallet_balance = res.data.wallet_balance
                    income = res.data.income
                    spending = res.data.spending
                }
            }
        }
        const onError = (error) => {
        }
        DASHBOARD(callback, onError)
    }

    let otp = ''

    const GET_OTP = async() => {
        document.querySelector(".btn").innerHTML = 'Sending OTP <i class="fa fa-spin fa-spinner"></i>';
        let res = await fetch(`https://fsi.ng/api/v1/africastalking/version1/messaging`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "sandbox-key": "0KDc0NGPKaK9TJDW23qXKma6NzIKXfl81634140240"
            },
            body: JSON.stringify({
                "username": user.name,
                "to": user.phone.substring(0,4) == "+234" ? user.phone : "+234"+user.phone.substring(1),
                "message": "Your account OTP verification pin is:  "+user.otp
            }),
        });
        res = await res.json()
        if(res){
            if(res.SMSMessageData.Recipients[0].statusCode == '101'){
                document.querySelector(".send").style.display = 'none'
                document.querySelector(".form").style.display = 'block'
                window.alert("OTP Sent")
                document.querySelector(".btn").innerHTML = '';
            }

            document.querySelector(".btn").innerHTML = 'GET OTP NOW';
        }
    }

</script>
<div class="w-full bg-blue-50 min-h-screen mt-16 p-4">

    <div class="w-full block rounded-md p-6 bg-blue-600 text-white">
        <h3 class="font-bold text-xl lg:text-2xl">Welcome, {user.name}!</h3>
        <p class="text-sm">
            What can we do for you today.
        </p>
    </div>

    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-green-500 rounded-md shadow-md px-4 py-8">
            <div class="text-xl mb-2 text-left font-bold text-white">&#8358;{wallet_balance ? wallet_balance : '0'}</div>
            <div class="text-right mb-2 text-sm uppercase text-white font-light">
                <i class="fa fa-wallet"></i>&nbsp; AVAILABLE BALANCE
            </div>
        </div>
        <div class="bg-yellow-500 rounded-md shadow-md px-4 py-8">
            <div class="text-xl mb-2 text-left font-bold text-white">&#8358;{income ? income : '0'}</div>
            <div class="text-right mb-2 text-sm uppercase text-white font-light">
                <i class="fa fa-arrow-down"></i>&nbsp; INBOUND
            </div>
        </div>
        <div class="bg-pink-500 rounded-md shadow-md px-4 py-8">
            <div class="text-xl mb-2 text-left font-bold text-white">&#8358;{spending ? spending : '0'}</div>
            <div class="text-right mb-2 text-sm uppercase text-white font-light">
                <i class="fa fa-arrow-up"></i>&nbsp; OUTBOUND
            </div>
        </div>
    </div>
    
    {#if user.verification == '0'}
        <div class="mt-4 bg-gray-50 shadow-md rounded-md p-6">
            <h3 class="mb-4 text-lg font-bold text-gray-400">Verify Your Phone Number</h3>
            <form style="display: none;" class="bg-white rounded-md shadow-md w-10/12 md:w-1/2 lg:w-1/3 m-auto mt-8 p-4 md:p-8 form" method="POST" on:submit|preventDefault=>
                <div id="info"></div>
                <div class="block mb-2">
                    <input required type="text" id="" bind:value={otp} class="border-3 border-gray-100 p-4 rounded-md outline-none w-full" placeholder="Enter OTP"/>
                    <p class="my-2 font-bold text-md cursor-pointer" on:click={GET_OTP}>RESEND</p>
                </div>
                <div class="block mt-4">
                    <button type="submit" class="btn block w-full bg-blue-600 text-center text-xl font-black text-white p-4 rounded-md">
                        VERIFY
                    </button>
                </div>
            </form>

            <button on:click|preventDefault={GET_OTP} type="submit" class="btn send block w-full bg-black text-center text-xl font-black text-white p-4 rounded-md">
                GET OTP NOW
            </button>
        </div>
    {/if}
</div>