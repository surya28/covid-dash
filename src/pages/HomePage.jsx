import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import useApi from '../hooks/useAPI';
import DetailsTable from '../components/DetailsTable';

const HomePage = () => {
    const { data, error, loading } = useApi('https://covid-193.p.rapidapi.com/statistics');
    const [covidData, setCovidData] = useState([]);

    useEffect(() => {
        if (data !== null && data.length > 0) {
            const copy = [...data];
            const response = copy.reduce(function (r, a) {
                r[a.continent] = r[a.continent] || [];
                r[a.continent].push(a);
                return r;
            }, []);

            setCovidData(response)
        }
    }, [data])

    if (error) {
        return <h2>An unexpected error occurred</h2>
    }

    if (loading) {
        return <Spin size="large" />
    }

    return (
        <div className='home'>
            {
                Object.keys(covidData)?.map(continent => {
                    return (
                        continent !== 'null' &&
                        <Card
                            title={continent}
                            className='card'
                        >
                            <p>Total population - {
                                covidData[continent]?.reduce((reducer, accu) => {
                                    reducer += accu?.population;
                                    return reducer
                                }, 0)
                            }</p>
                            <p>Total cases - {
                                covidData[continent]?.reduce((reducer, accu) => {
                                    reducer += accu?.cases?.total;
                                    return reducer
                                }, 0)
                            }</p>
                            <p>Total deaths - {
                                covidData[continent]?.reduce((reducer, accu) => {
                                    reducer += accu?.deaths?.total || 0;
                                    return reducer
                                }, 0)
                            }</p>

                            <DetailsTable data={covidData[continent]} />
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default HomePage;