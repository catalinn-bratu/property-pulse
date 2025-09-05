import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/:id
export const GET = async (request, context) => {
    try {
        await connectDB();

        const { params } = context;
        // Await params if it's a Promise (Next.js App Router API)
        const awaitedParams = typeof params?.then === 'function' ? await params : params;

        const property = await Property.findById(awaitedParams.id);
        if (!property) {
            return new Response('Property not found', { status: 404 });
        }

        return new Response(JSON.stringify(property), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Database error', { status: 500 });
    }
}