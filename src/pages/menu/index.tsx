import Image from 'next/image';
import Link from 'next/link';
import EnterCode from '@/components/entercode';

export default function Menu() {
  return (
    <div className="min-h-screen w-full bg-[#EBE6DE] flex flex-col items-center justify-start relative overflow-hidden">
        {/* Header */}
            <div className="w-full h-[100px] bg-[#69806C] flex items-center px-10 justify-between shadow-lg">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#69806C] rounded-full shadow-md flex items-center justify-center">
                <Link href="/home">
                <span className="text-white text-2xl">{'<'}</span>
                </Link>
                </div>
            </div>
            </div>

      {/* 🧾 Section Header: Menu Design */}
        <div className="relative w-full mb-8 mt-4">
        <div className="absolute top-6 left-0 w-[280px] h-24 bg-[#EBE6DE] border-4 border-white shadow-[0_0_10px_rgba(0,0,0,0.25),_0_10px_30px_rgba(0,0,0,0.25)] rounded-r-[30px] flex items-center pl-6">
            <h2 className="text-white text-[32px] sm:text-[40px] md:text-[48px] font-['Iceland'] leading-none drop-shadow-md">
            Menu design
            </h2>
        </div>
        </div>

        
        {/* 🧊 Cup Size Selector */}
        <div className="w-full max-w-3xl mx-auto mt-16 mb-10 flex flex-col items-center">
        <h2 className="text-[40px] text-[#69806C] font-['Iceland'] mb-6">Cup Size</h2>
        <div className="flex gap-6">
            {/* Small */}
            <div className="flex flex-col items-center">
            <div className="w-[100px] h-[100px] bg-[#EBE6DE] shadow-[0_0_20px_rgba(0,0,0,0.25),inset_0_10px_20px_rgba(0,0,0,0.25)] flex items-center justify-center rounded">
                <span className="text-[96px] text-[#543429] font-['Iceland'] leading-none">S</span>
            </div>
            </div>
            {/* Medium */}
            <div className="flex flex-col items-center">
            <div className="w-[100px] h-[100px] bg-[#EBE6DE] shadow-[0_0_20px_rgba(0,0,0,0.25),inset_0_10px_20px_rgba(0,0,0,0.25)] flex items-center justify-center rounded">
                <span className="text-[96px] text-[#543429] font-['Iceland'] leading-none">M</span>
            </div>
            </div>
            {/* Large */}
            <div className="flex flex-col items-center">
            <div className="w-[100px] h-[100px] bg-[#EBE6DE] shadow-[0_0_20px_rgba(0,0,0,0.25),inset_0_10px_20px_rgba(0,0,0,0.25)] flex items-center justify-center rounded">
                <span className="text-[96px] text-[#543429] font-['Iceland'] leading-none">L</span>
            </div>
            </div>
        </div>
        </div>

        {/* 🍧 Shaved Ice Section */}
        <h2 className="text-3xl text-[#69806C] mb-6 text-center">Shaved Ice Flavors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 max-w-7xl mx-auto">
        {[
            {
            name: 'Strawberry Shaved Ice',
            score: 1,
            description:
                'A sweet, icy kiss of summer! Burst of juicy strawberry flavor—cool, refreshing, and impossible to resist.',
            image: '/images/strawberry-ice.png',
            color: '#B23434',
            },
            {
            name: 'Thai Tea Shaved Ice',
            score: 2,
            description:
                'Bold. Creamy. Unmistakably Thai. Rich aroma of authentic Thai tea melts on your tongue with every icy bite.',
            image: '/images/thai-tea-ice.png',
            color: '#CD9445',
            },
            {
            name: 'Matcha Shaved Ice',
            score: 3,
            description:
                'Earthy. Creamy. Cool. Premium green tea meets the chill of shaved ice. Balanced—just like your zen.',
            image: '/images/matcha-ice.png',
            color: '#527657',
            },
        ].map((flavor, index) => (
            <div
            key={index}
            className="flex flex-col items-center gap-4 bg-[#EBE6DE] p-4 rounded-md border border-[#69806C] shadow-inner shadow-black/20"
            >
            <div className="w-56 h-64 relative">
                <Image
                src={flavor.image}
                alt={flavor.name}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
                />
            </div>
            <h3 className="text-[32px] text-center font-['Iceland']" style={{ color: flavor.color }}>
                {flavor.name}
            </h3>
            <div className="w-[67px] h-[50px] bg-[#EBE6DE] shadow-md flex items-center justify-center text-[32px] text-[#543429]">
                {flavor.score}
            </div>
            <p className="text-[20px] text-[#69806C] text-center max-w-xs leading-snug">
                {flavor.description}
            </p>
            </div>
        ))}
        </div>



        {/* 🍓 Fruit Toppings */}
        <h2 className="text-2xl md:text-3xl text-[#69806C] mb-6 text-center">
        Fruit Toppings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
        {[
            {
            name: 'Apple',
            score: 1,
            description: 'Juicy crunch. Every frosty bite bursts with orchard-fresh flavor.',
            image: '/images/apple.png',
            textColor: '#B51212',
            },
            {
            name: 'Cherry',
            score: 2,
            description: 'Sweet. Tangy. Cherrylicious! Pure cherry charm in every bite.',
            image: '/images/cherry.png',
            textColor: '#B51212',
            },
            {
            name: 'Blueberry',
            score: 3,
            description: 'Sweet ‘n’ tangy berries over fluffy shaved ice. Freshness you can feel.',
            image: '/images/blueberry.png',
            textColor: '#354088',
            },
            {
            name: 'Raspberry',
            score: 4,
            description: 'Bold, tangy, and oh-so-refreshing. Every bite zings with berry attitude!',
            image: '/images/raspberry.png',
            textColor: '#B51212',
            },
            {
            name: 'Strawberry',
            score: 5,
            description: 'Sweet, juicy, and perfectly chilled. Like a hug from summer—on ice.',
            image: '/images/strawberry.png',
            textColor: '#B51212',
            },
            
        ].map((item, idx) => (
            <div
            key={idx}
            className="bg-[#EBE6DE] rounded-xl shadow-inner p-4 flex flex-col items-center text-center hover:scale-105 transition"
            >
            <img
                src={item.image}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl" style={{ color: item.textColor }}>
                {item.name}
            </h3>
            <div className="flex items-center justify-center mt-2 mb-2">
                <div className="w-12 h-12 bg-[#EBE6DE] shadow-md flex items-center justify-center text-3xl font-bold text-[#543429]">
                {item.score}
                </div>
            </div>
            <p className="text-sm text-[#69806C] px-2 leading-tight">
                {item.description}
            </p>
            </div>
        ))}
        </div>


        <EnterCode />


      {/* Add more flavor and topping blocks below in similar Tailwind format */}
    </div>
  );
}