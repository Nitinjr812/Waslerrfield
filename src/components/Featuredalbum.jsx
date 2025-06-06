import React, { useState } from 'react';
import { Heart, Eye } from 'lucide-react';

const FeaturedAlbumsSection = () => {
    const featuredAlbums = [
        {
            id: 1,
            title: "Midnight Dreams",
            artist: "Your Artist Name",
            price: "$9.99",
            originalPrice: "$12.99",
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
            badge: "New Release",
            genre: "Electronic"
        },
        {
            id: 2,
            title: "Urban Echoes",
            artist: "Your Artist Name",
            price: "$7.99",
            originalPrice: "$9.99",
            image: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=400&h=400&fit=crop",
            badge: "Best Seller",
            genre: "Hip Hop"
        },
        {
            id: 3,
            title: "Ocean Breeze",
            artist: "Your Artist Name",
            price: "$8.50",
            originalPrice: "$10.99",
            image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop",
            badge: "Editor's Pick",
            genre: "Ambient"
        },
        {
            id: 4,
            title: "Neon Lights",
            artist: "Your Artist Name",
            price: "$6.99",
            originalPrice: "$8.99",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
            badge: "Fan Favorite",
            genre: "Synthwave"
        }
    ];

    const [activeAlbumId, setActiveAlbumId] = useState(null);

    const handleAlbumClick = (albumId, e) => {
        // Only toggle on mobile
        if (window.innerWidth < 640) {
            e.preventDefault();
            setActiveAlbumId(activeAlbumId === albumId ? null : albumId);
        }
    };

    return (
        <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Featured Albums
                        </span>
                    </h2>
                    <p className="text-gray-400 text-base sm:text-lg">Your original music collection</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {featuredAlbums.map((album) => (
                        <div
                            key={album.id}
                            className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] relative cursor-pointer"
                            onClick={(e) => handleAlbumClick(album.id, e)}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={album.image}
                                    alt={album.title}
                                    className="w-full h-40 sm:h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Action Buttons */}
                                <div className={`absolute inset-0 bg-black/50 ${activeAlbumId === album.id ? 'opacity-100' : 'opacity-0 sm:group-hover:opacity-100'
                                    } transition-opacity duration-300 flex items-center justify-center gap-3 sm:gap-4`}>
                                    <button
                                        className="bg-purple-600/80 hover:bg-purple-500 active:bg-purple-400 p-3 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95"
                                        aria-label="Add to favorites"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("Added to favorites:", album.title);
                                        }}
                                    >
                                        <Heart className="w-5 h-5 fill-white/80 hover:fill-white" />
                                    </button>

                                    <button
                                        className="bg-purple-600/80 hover:bg-purple-500 active:bg-purple-400 p-3 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95"
                                        aria-label="View details"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("Viewing details:", album.title);
                                        }}
                                    >
                                        <Eye className="w-5 h-5 text-white" />
                                    </button>
                                </div>

                                {/* Album Badge */}
                                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                                        {album.badge}
                                    </span>
                                </div>
                            </div>

                            <div className="p-3 sm:p-4 lg:p-6">
                                <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-1 group-hover:text-purple-400 transition-colors duration-300 line-clamp-1">
                                    {album.title}
                                </h3>
                                <p className="text-gray-400 text-xs sm:text-sm mb-2">{album.artist}</p>
                                <p className="text-xs text-purple-400 mb-3">{album.genre}</p>

                                <div className="flex items-center justify-between mb-3 sm:mb-4">
                                    <div className="flex items-center space-x-1 sm:space-x-2">
                                        <span className="text-lg sm:text-xl font-bold text-purple-400">{album.price}</span>
                                        <span className="text-xs sm:text-sm text-gray-500 line-through">{album.originalPrice}</span>
                                    </div>
                                </div>

                                <button
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 active:scale-95"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("Added to cart:", album.title);
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedAlbumsSection;