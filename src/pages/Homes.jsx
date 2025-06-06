import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Search, Menu, X, Star, ArrowRight, Play, Heart, Eye, Music, Disc, Mic2, Album } from 'lucide-react';
import Navbar from '../components/Navbar';
import FeaturedAlbumsSection from '../components/FeaturedAlbum';

const Home = () => {
    const [animatedSections, setAnimatedSections] = useState(new Set());
    const observerRef = useRef(null);

    // Sample music data
    // const featuredAlbums = [
    //     {
    //         id: 1,
    //         title: "Midnight Dreams",
    //         artist: "Your Artist Name",
    //         price: "$9.99",
    //         originalPrice: "$12.99",
    //         image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    //         badge: "New Release",
    //         genre: "Electronic"
    //     },
    //     {
    //         id: 2,
    //         title: "Urban Echoes",
    //         artist: "Your Artist Name",
    //         price: "$7.99",
    //         originalPrice: "$9.99",
    //         image: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=400&h=400&fit=crop",

    //         badge: "Best Seller",
    //         genre: "Hip Hop"
    //     },
    //     {
    //         id: 3,
    //         title: "Ocean Breeze",
    //         artist: "Your Artist Name",
    //         price: "$8.50",
    //         originalPrice: "$10.99",
    //         image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop",

    //         badge: "Editor's Pick",
    //         genre: "Ambient"
    //     },
    //     {
    //         id: 4,
    //         title: "Neon Lights",
    //         artist: "Your Artist Name",
    //         price: "$6.99",
    //         originalPrice: "$8.99",
    //         image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
    //         badge: "Fan Favorite",
    //         genre: "Synthwave"
    //     }
    // ];

    const genres = [
        { name: "Electronic", icon: Music, count: "45 albums" },
        { name: "Ambient", icon: Disc, count: "32 albums" },
        { name: "Hip Hop", icon: Mic2, count: "28 albums" },
        { name: "Synthwave", icon: Album, count: "18 albums" }
    ];

    // Sample tracks for the audio player


    // Scroll animation observer
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !animatedSections.has(entry.target.id)) {
                        setAnimatedSections(prev => new Set([...prev, entry.target.id]));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const elementsToObserve = document.querySelectorAll('[data-animate]');
        elementsToObserve.forEach((el) => {
            observerRef.current.observe(el);
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [animatedSections]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section with rings - fully responsive */}
            <section className="relative h-[100dvh] min-h-[500px] md:min-h-[600px] md:h-screen flex items-center justify-center overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30 animate-gradient-shift"></div>

                {/* 3D Orb Container with rings - optimized for mobile */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none">
                    {/* Desktop Orb with rings */}
                    <div className="hidden md:block relative w-64 h-64 lg:w-80 lg:h-80">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-600/30 blur-xl animate-pulse-slow"></div>
                        {/* RESTORED RINGS */}
                        {[0, 1, 2].map((i) => (
                            <div
                                key={`d-ring-${i}`}
                                className="absolute inset-0 rounded-full border-[1px] border-purple-400/50"
                                style={{
                                    transform: `scale(${1 + i * 0.2}) rotateZ(${i * 20}deg)`,
                                    animation: `spin ${8 + i * 4}s linear infinite`,
                                    boxShadow: `0 0 15px rgba(192, 132, 252, ${0.3 - i * 0.1})`,
                                }}
                            ></div>
                        ))}
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={`d-dot-${i}`}
                                className="absolute w-2 h-2 rounded-full bg-pink-400/80"
                                style={{
                                    top: `${50 + Math.sin(i * 0.5) * 30}%`,
                                    left: `${50 + Math.cos(i * 0.5) * 30}%`,
                                    animation: `orbit ${Math.random() * 10 + 5}s linear infinite`,
                                    animationDelay: `${i * 0.5}s`,
                                    filter: "blur(1px)",
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Mobile Orb with rings (simplified but still beautiful) */}
                    <div className="md:hidden relative w-48 h-48 sm:w-56 sm:h-56">
                        <div className="absolute inset-0  rounded-full bg-gradient-to-br from-purple-500/40 to-pink-600/30 blur-lg animate-pulse-slow"></div>
                        {/* MOBILE RINGS (2 instead of 3 for better performance) */}
                        {[0, 1].map((i) => (
                            <div
                                key={`m-ring-${i}`}
                                className="absolute inset-0   rounded-full border-[1px] border-purple-400/40"
                                style={{
                                    transform: `scale(${1 + i * 0.15}) rotateZ(${i * 20}deg)`,
                                    animation: `spin ${12 + i * 4}s linear infinite`,
                                    boxShadow: `0 0 ${8 + i * 3}px rgba(192, 132, 252, ${0.3 - i * 0.1})`,
                                }}
                            ></div>
                        ))}
                        {/* Fewer dots for mobile */}
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={`m-dot-${i}`}
                                className="absolute w-1.5 h-1.5 rounded-full bg-pink-400/70"
                                style={{
                                    top: `${50 + Math.sin(i * 0.8) * 25}%`,
                                    left: `${50 + Math.cos(i * 0.8) * 25}%`,
                                    animation: `orbit ${Math.random() * 10 + 5}s linear infinite`,
                                    animationDelay: `${i * 0.5}s`,
                                    filter: "blur(0.5px)",
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Light Trails */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Desktop trails */}
                        <div className="hidden md:block">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={`d-trail-${i}`}
                                    className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-purple-400/30"
                                    style={{
                                        transform: `rotate(${i * 60}deg) translateY(-150px)`,
                                        animation: `trail ${Math.random() * 8 + 4}s linear infinite`,
                                        animationDelay: `${i * 0.3}s`,
                                    }}
                                ></div>
                            ))}
                        </div>
                        {/* Mobile trails */}
                        <div className="md:hidden">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={`m-trail-${i}`}
                                    className="absolute top-1/2 left-1/2 w-0.5 h-0.5 rounded-full bg-purple-400/20"
                                    style={{
                                        transform: `rotate(${i * 120}deg) translateY(-100px)`,
                                        animation: `trail ${Math.random() * 8 + 4}s linear infinite`,
                                        animationDelay: `${i * 0.3}s`,
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Background image */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 md:opacity-10">
                    <img
                        src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop"
                        alt="Album cover"
                        className="w-full h-full object-cover blur-xl scale-110"
                        loading="lazy"
                    />
                </div>
                <div className="relative z-20 text-center max-w-4xl mx-auto px-4 w-full">
                    <h1 className="text-5xl xs:text-6xl sm:text-6xl md:text-7xl font-bold mb-3 sm:mb-6 animate-fade-in">
                        <span className="bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
                            Authentic Audio Drops
                        </span>
                    </h1>

                    <p className="text-base sm:text-2xl md:text-3xl lg:text-3xl text-gray-300 mb-6 sm:mb-10 animate-slide-up px-2 sm:px-4 leading-tight sm:leading-normal">
                        Hear It. Love It. Make It Yours
                    </p>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <button className="relative group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 sm:px-10 sm:py-4 md:px-12 md:py-5 rounded-full font-bold text-base sm:text-xl md:text-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 sm:space-x-3">
                            <span>Browse Music</span>
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 -z-10 blur-md group-hover:animate-pulse-slow transition-all duration-500"></span>
                        </button>
                    </div>
                </div>

                {/* Scroll indicator - improved for mobile */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="animate-bounce">
                        <div className="w-6 h-10 sm:w-7 sm:h-12 md:w-8 md:h-12 border-2 border-white/40 rounded-full flex justify-center pt-2">
                            <div className="w-1.5 h-2 sm:w-2 sm:h-3 bg-white/70 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Categories Section - Now Genres */}
            <section
                id="genres"
                data-animate
                className={`py-12 sm:py-20 transition-all duration-1000 ${animatedSections.has('genres') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Explore Genres
                            </span>
                        </h2>
                        <p className="text-gray-400 text-base sm:text-lg">Discover music in your favorite styles</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {genres.map((genre, index) => (
                            <div
                                key={index}
                                className="group bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-8 rounded-2xl hover:from-purple-900/50 hover:to-pink-900/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                            >
                                <div className="text-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:rotate-12 transition-transform duration-300">
                                        <genre.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2 group-hover:text-purple-400 transition-colors duration-300">
                                        {genre.name}
                                    </h3>
                                    <p className="text-gray-400 text-xs sm:text-sm">{genre.count}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Albums */}
            <FeaturedAlbumsSection />

            {/* Features Section - Updated for Music */}
            <section
                id="features"
                data-animate
                className={`py-12 sm:py-20 bg-gradient-to-r from-gray-900 to-black transition-all duration-1000 ${animatedSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        <div className="text-center group">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:rotate-12 transition-transform duration-300">
                                <Music className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Original Compositions</h3>
                            <p className="text-gray-400 text-sm sm:text-base">100% unique music crafted</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:rotate-12 transition-transform duration-300">
                                <Disc className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">High Quality</h3>
                            <p className="text-gray-400 text-sm sm:text-base">Studio-grade audio files in multiple formats</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:rotate-12 transition-transform duration-300">
                                <Mic2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Direct Support</h3>
                            <p className="text-gray-400 text-sm sm:text-base">Connect directly with the artist</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-12 sm:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Join the Community
                        </span>
                    </h2>
                    <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8">Get updates on new releases and exclusive content</p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email..."
                            className="flex-1 px-4 sm:px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white text-sm sm:text-base"
                        />
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black border-t border-gray-800 py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <Music className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Your Music Brand
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm sm:text-base">Original music created with passion and shared with the world.</p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
                            <div className="space-y-2">
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 block text-sm sm:text-base">About</a>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 block text-sm sm:text-base">Music</a>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 block text-sm sm:text-base">Licensing</a>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 block text-sm sm:text-base">Contact</a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
                            <div className="space-y-2">
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 block text-sm sm:text-base">Downloads</a>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 block text-sm sm:text-base">FAQ</a>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 block text-sm sm:text-base">Refunds</a>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 block text-sm sm:text-base">Account</a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Connect</h4>
                            <div className="space-y-2">
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 block text-sm sm:text-base">Spotify</a>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 block text-sm sm:text-base">Apple Music</a>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 block text-sm sm:text-base">YouTube</a>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 block text-sm sm:text-base">Instagram</a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
                        <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Your Music Brand. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
  0% { opacity: 0.4; transform: scaleY(0.6); }
  50% { opacity: 1; transform: scaleY(1.2); }
  100% { opacity: 0.7; transform: scaleY(0.8); }
}
                
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes music-bar {
                    0%, 100% { height: 20%; }
                    50% { height: 80%; }
                }
                
                @keyframes music-bar-short {
                    0%, 100% { height: 60%; }
                    50% { height: 30%; }
                }
                
                @keyframes music-bar-medium {
                    0%, 100% { height: 40%; }
                    50% { height: 80%; }
                }
                
                @keyframes pulse-slow {
                    0% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.05); opacity: 0.4; }
                    100% { transform: scale(1); opacity: 0.7; }
                }
                
                .animate-gradient-shift {
                    background-size: 200% 200%;
                    animation: gradient-shift 15s ease infinite;
                }
                
                .animate-music-bar {
                    animation: music-bar 1.5s ease-in-out infinite;
                }
                
                .animate-music-bar-short {
                    animation: music-bar-short 1.2s ease-in-out infinite;
                }
                
                .animate-music-bar-medium {
                    animation: music-bar-medium 1.4s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease infinite;
                }
                @keyframes spin {
  from { transform: rotate(0deg) scale(1); }
  to { transform: rotate(360deg) scale(1); }
}

@keyframes orbit {
  0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
}

@keyframes trail {
  0% { transform: rotate(0deg) translateY(-150px) scale(1); opacity: 0; }
  20% { opacity: 0.7; }
  80% { opacity: 0.7; }
  100% { transform: rotate(360deg) translateY(-150px) scale(0.5); opacity: 0; }
}
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }
                
                .animate-slide-up {
                    animation: slide-up 1s ease-out forwards;
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Home;