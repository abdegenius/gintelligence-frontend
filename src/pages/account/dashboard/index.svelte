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
                <i class="fa fa-arrow-down"></i>&nbsp; INCOME TODAY
            </div>
        </div>
        <div class="bg-pink-500 rounded-md shadow-md px-4 py-8">
            <div class="text-xl mb-2 text-left font-bold text-white">&#8358;{spending ? spending : '0'}</div>
            <div class="text-right mb-2 text-sm uppercase text-white font-light">
                <i class="fa fa-arrow-up"></i>&nbsp; SPENDINGS TODAY
            </div>
        </div>
    </div>
    
</div>