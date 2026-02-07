export async function onRequestGet(context) {
    const { request } = context;
    const url = new URL(request.url);
    const drwNo = url.searchParams.get('drwNo');

    if (!drwNo) {
        return new Response(JSON.stringify({ error: 'drwNo query parameter is required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const dhlotteryResponse = await fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`);
        
        // Check if the response from dhlottery was successful
        if (!dhlotteryResponse.ok) {
            // Attempt to read body for more info, but handle if it's not readable
            const errorBody = await dhlotteryResponse.text().catch(() => "Could not read error body");
            console.error(`Error fetching from dhlottery.co.kr: ${dhlotteryResponse.status} - ${errorBody}`);
            return new Response(JSON.stringify({ 
                error: 'Failed to fetch data from dhlottery.co.kr', 
                status: dhlotteryResponse.status,
                details: errorBody
            }), {
                status: 502, // Bad Gateway
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }

        const data = await dhlotteryResponse.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Allow all origins for this API, adjust as needed
            }
        });

    } catch (error) {
        console.error('Error in Cloudflare Function:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
    }
}