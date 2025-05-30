import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToSerializableObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";


async function SearchResultsPage({searchParams: { location, propertyType } }) {

    await connectDB();

    const locationPattern = new RegExp(location, 'i');
    
    let query = {
        $or: [
            {name: locationPattern},
            {description: locationPattern},
            {'location.city': locationPattern},
            {'location.state': locationPattern},
            {'location.zipcode': locationPattern}
        ]
    };

    if (propertyType && propertyType !== "All") {
        const propertyTypePattern = new RegExp(propertyType, 'i');
        query.type = propertyTypePattern;
    }

    const PropertiesQueryResults = await Property.find(query).lean();
    const properties = convertToSerializableObject(PropertiesQueryResults);

    
    return (
        <>
        <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <PropertySearchForm />
        </div>
        </section>
        <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
        <Link href='/properties' className="flex items-center text-blue-500 hover:text-blue-600 mb-3"><FaArrowAltCircleLeft className="mr-2" /> Back to Properties</Link>
        <h1 className="text-2xl mb-4 font-bold">Search Results</h1>

        {properties.length === 0 ? (
            <p> No Properties Found</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>
        )}
        </div>
        </section>
        </>
    );
}

export default SearchResultsPage;