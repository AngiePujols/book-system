export const Hero = () => {
    return (
        <div className="hero h-96 relative">
            <div className="absolute inset-0 bg-green-900 bg-opacity-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl text-white font-bold">Welcome to the library</h1>
                    <p className="text-white text-lg">The best place to find your favorite books</p>
                </div>
            </div>
        </div>
    )
}