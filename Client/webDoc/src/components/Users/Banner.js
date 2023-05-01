import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../Redux/User/userSlice';
import { Link } from 'react-router-dom';

const Banner = () => {
    const user = useSelector(selectUser);
    const banners = [
        {
            no: 1,
            banner: 'https://thumbs.dreamstime.com/b/health-care-medical-technology-services-concept-invented-vaccine-health-care-medical-technology-services-concept-159515843.jpg'
        },
        {
            no: 2,
            banner: 'https://img.freepik.com/premium-photo/concept-personal-doctor-with-online-consultation-treatment-methods-doctor-with-tablet_102583-6872.jpg?w=1380'
        },
        {
            no: 3,
            banner: 'https://img.freepik.com/premium-photo/doctor-with-stethoscope-touching-digital-icons_104033-2.jpg'
        },
        {
            no: 4,
            banner: 'https://t4.ftcdn.net/jpg/05/85/89/43/240_F_585894389_zhkDUhcZCOIWChoiuhl9hYucCZzCQxMP.jpg'
        },
        {
            no: 5,
            banner: 'https://watermark.lovepik.com/photo/40007/3397.jpg_wh1200.jpg'
        }

    ]
    const [bannerNo, setBannerNo] = useState(0)
    useEffect(() => {
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        const rndInt = randomIntFromInterval(0, 4)
        setBannerNo(rndInt)

    }, [])

    return (
        <div
            class="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center"
            style={{ backgroundImage: `url(${banners[bannerNo]?.banner})`, height: "500px" }}>
            <div
                class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
                <div class="flex h-full items-center justify-center">
                    <div class="text-white">
                        <h2 class="mb-4 text-4xl font-semibold">webDoc</h2>

                        <h4 class="mb-6 mt-2 text-xl font-semibold">Online Consultancy With Top Doctors
                            Anytime, Anywhere, Any device.</h4>
                        {
                            user ?
                                <Link
                                    to='/doctors'
                                    type="button"
                                    class="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    View Doctors
                                </Link>
                                :
                                <Link
                                    to='/signup'
                                    type="button"
                                    class="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    Get Started
                                </Link>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner