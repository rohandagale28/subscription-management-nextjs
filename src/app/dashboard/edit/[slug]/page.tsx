import { Button } from "@/components/ui/button";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/model/user.model";

export default async function Page({ params }: { params: { slug: string } }) {
    await connectDB();

    let userData = null;

    try {
        const user = await User.findById(params.slug);
        userData = user ? user.toObject() : null;
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return (
        <div>
            My Post: {params.slug}
            <Button>Back</Button>
            <div>
                {userData ? (
                    <div>
                        <h1>{userData.title}</h1>
                        {/* Render other user data here */}
                    </div>
                ) : (
                    <p>No user data found.</p>
                )}
            </div>
        </div>
    );
}
