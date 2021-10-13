<script>
    import {onMount} from "svelte"
    onMount(() => {
        const user = localStorage.getItem('user')
        if (!user || user == "undefined" || user == "" || user.length == 0){
            window.location.assign('/login')
        }
    })
    const showMenu = () => {
        document.querySelector(".mobile-menu").style.display = 'block'
    }
    const closeMenu = () => {
        document.querySelector(".mobile-menu").style.display = 'none'
    }
    const closeMenuTab = () => {
        document.querySelector(".mobile-menu").style.display = 'none'
    }
</script>

<header class="fixed z-50 bg-black h-16 w-full m-0 p-0">
    <nav class="flex justify-between items-center p-4">
        <div>
            <span class="tet-sm md:text-xl font-bold text-white">G-INTELLIGENCE</span>
        </div>
        <div class="block md:hidden">
            <span on:click={showMenu} class="cursor-pointer">
                <i class="fa fa-bars text-white"></i>
            </span>
        </div>
    </nav>
    <div style="display:none;" class="mobile-menu fixed min-h-screen block md:hidden bg-blue-900 w-full p-8 m-0 text-white">
        <ul class="m-auto text-center">
            <li class="mb-8 flex justify-end items-center">
                <div on:click={closeMenu} class="cursor-pointer">
                    <i class="fa fa-2x fa-times"></i>
                </div>
            </li>
            <li class="w-full mb-4 hover:text-2xl cursor-pointer p-4 text-xl font-bold text-white">
                <a on:click={closeMenuTab} class="no-underline text-white" href="/account/dashboard">
                <span class="text-white">&nbsp; DASHBOARD</span></a>
            </li>
            <li class="w-full mb-4 cursor-pointer p-4 text-xl font-bold text-white">
                <a on:click={closeMenuTab} class="no-underline text-white" href="/account/profile">
                <span class="text-white">&nbsp; PROFILE</span></a>
            </li>
            <li class="w-full mb-4 cursor-pointer p-4 text-xl font-bold text-white">
                <a on:click={closeMenuTab} class="no-underline text-white" href="/account/wallet">
                <span class="text-white">&nbsp; WALLET</span></a>
            </li>
            <li class="w-full mb-4 cursor-pointer p-4 text-xl font-bold text-white">
                <a on:click={closeMenuTab} class="no-underline text-white" href="/account/ticketing">
                <span class="text-white">&nbsp; TICKETING</span></a>
            </li>
            <!-- <li class="w-full mb-4 cursor-pointer p-4 text-xl font-bold text-white">
                <a class="no-underline" href="/account/billing">
                <span class="text-white">&nbsp; BILLING</span></a>
            </li> -->
            <li class="w-full mb-4 cursor-pointer p-4 text-xl font-bold text-white">
                <span class="text-white">&nbsp; LOGOUT</span>
            </li>
        </ul>
    </div>
</header>

<main class="relative flex justify-start">
    <aside class="w-1/3 lg:w-1/4 xl:w-1/5 hidden relative md:block bg-gray-300 min-h-screen">
        <ul class="mt-40 ml-4 xl:ml-12 fixed">
            <li class="w-full mb-8 hover:text-2xl cursor-pointer p-4 text-md xl:text-xl font-bold text-blue-900">
                <a class="no-underline" href="/account/dashboard"><i class="fa fa-th"></i>
                &nbsp; DASHBOARD</a>
            </li>
            <li class="w-full mb-8 hover:text-2xl cursor-pointer p-4 text-md xl:text-xl font-bold text-blue-900">
                <a class="no-underline" href="/account/profile"><i class="fa fa-user"></i>
                &nbsp; PROFILE</a>
            </li>
            <li class="w-full mb-8 hover:text-2xl cursor-pointer p-4 text-md xl:text-xl font-bold text-blue-900">
                <a class="no-underline" href="/account/wallet"><i class="fa fa-wallet"></i>
                &nbsp; WALLET</a>
            </li>
            <li class="w-full mb-8 hover:text-2xl cursor-pointer p-4 text-md xl:text-xl font-bold text-blue-900">
                <a class="no-underline" href="/account/ticketing"><i class="fa fa-tag"></i>
                &nbsp; TICKETING</a>
            </li>
            <!-- <li class="w-full mb-8 hover:text-2xl cursor-pointer p-4 text-md xl:text-xl font-bold text-blue-900">
                <a class="no-underline" href="/account/billing"><i class="fa fa-list"></i>
                &nbsp; BILLING</a>
            </li> -->
            <li class="w-full mb-8 hover:text-2xl cursor-pointer p-4 text-md xl:text-xl font-bold text-blue-900">
                <i class="fa fa-sign-out-alt"></i>
                &nbsp; LOGOUT
            </li>
        </ul>

    </aside>
    <section class="w-full lg:w-3/4 xl:w-4/5 ">
        <slot></slot>
    </section>
</main>