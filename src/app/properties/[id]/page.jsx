import { connectDB } from "@/config/database";
import PropertyDetails from "@/components/PropertyDetails";
import Property from "@/models/Property";
import PropertyImageHeader from "@/components/PropertyImageHeader";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyImages from "@/components/PropertyImages";
import { convertToSerializableObject } from "@/utils/convertToSerializableObject";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";
import PropertyContactForm from "@/components/PropertyContactForm";
export default async function PropertyPage({ params }) {
  await connectDB();
  const propertyDoc = await Property.findById(params.id).lean();
  const property = convertToSerializableObject(propertyDoc);
  
  if (!property) {
    return <h1 className="text-3xl text-center font-bold">Property Not Found</h1>;
  }
  
  return (
    <>
      <PropertyImageHeader image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_30%] w-full gap-6">
            <PropertyDetails property={property} />
             <aside className="space-y-4">
            <BookmarkButton property={property} />
            <ShareButton property={property} />
            <PropertyContactForm property={property} />

            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
}
// you also change folder name to [..id] to make it a catch all route

