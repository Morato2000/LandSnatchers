import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

async function FeaturedProperties() {

    await connectDB();

    const properties = await Property.find({is_featured: true}).lean();

    return properties.length > 0 ? (
        <section className=" bg-blue-50 px-4 py-6">
            <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Featured Properties</h2>
            <div className="container-xl lg:container m-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {properties.map((property) => (
                        <FeaturedPropertyCard 
                            key={property._id}
                            property={property}
                        />
                    ))}
                </div>
            </div>
        </section>
    ) : null;
    
    return (
        <>
        
        </>
    );
}

export default FeaturedProperties;