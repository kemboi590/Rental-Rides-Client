import { useEffect, useState } from 'react';
import { VehicleSpecificationsAPI, VSpecifications } from '../../../../features/vehicles/vehicleSpecs';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF4D4D', '#8A2BE2', '#5F9EA0'];

interface ChartData {
    name: string;
    value: number;
}

const VSpecReport = () => {
    const { data: vehicleSpecsData = [], isLoading: vehicleSpecsLoading } = VehicleSpecificationsAPI.useGetVehicleSpecificationsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [colorData, setColorData] = useState<ChartData[]>([]);
    const [manufacturerData, setManufacturerData] = useState<ChartData[]>([]);
    const [chartWidth, setChartWidth] = useState<number>(window.innerWidth < 768 ? 300 : 500);
    const [chartHeight, setChartHeight] = useState<number>(window.innerWidth < 768 ? 250 : 300);

    useEffect(() => {
        const handleResize = () => {
            setChartWidth(window.innerWidth < 768 ? 300 : 500);
            setChartHeight(window.innerWidth < 768 ? 250 : 300);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call the function to set the initial dimensions

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!vehicleSpecsLoading && vehicleSpecsData.length > 0) {
            const colorCounts: Record<string, number> = {};
            const manufacturerCounts: Record<string, number> = {};

            vehicleSpecsData.forEach((spec: VSpecifications) => {
                colorCounts[spec.color] = (colorCounts[spec.color] || 0) + 1;
                manufacturerCounts[spec.manufacturer] = (manufacturerCounts[spec.manufacturer] || 0) + 1;
            });

            setColorData(Object.entries(colorCounts).map(([name, value]) => ({ name, value })));
            setManufacturerData(Object.entries(manufacturerCounts).map(([name, value]) => ({ name, value })));
        }
    }, [vehicleSpecsLoading, vehicleSpecsData]);

    if (vehicleSpecsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-slate-200 p-4'>
            <div className='card mx-auto bg-white w-full rounded-md mb-5 border-2 p-4'>
                <h2 className="text-center text-xl mb-4 text-webcolor font-bold">Vehicle Specifications Report</h2>
                <div className='flex flex-col gap-2 md:flex-row justify-around'>
                    <div className='w-full md:w-1/2'>
                        <h3 className="text-center text-lg mb-2">Vehicle Colors Distribution</h3>
                        <PieChart width={chartWidth} height={chartHeight}>
                            <Pie
                                data={colorData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius="80%"
                                fill="#8884d8"
                                label
                            >
                                {colorData.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip />
                        </PieChart>
                    </div>
                    <div className='w-full md:w-1/2'>
                        <h3 className="text-center text-lg mb-2">Number of Vehicles by Manufacturer</h3>
                        <BarChart width={chartWidth} height={chartHeight} data={manufacturerData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <RechartsTooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VSpecReport;
