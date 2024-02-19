import React, { FC } from 'react';
import { statsFrame } from '../state/DataLoadingState';

interface StatsProps {
  data: statsFrame;
}

const LoadStats: FC<StatsProps> = ({ data }) => {
    const lablesArray=["Total Number of Songs", "Total Number of Artist", "Total Number of Albums", "Total Number of Genre"];
    return(
        <div className="statsContainer">
            <div className='statsTitle'>Statistics</div>
            {Object.keys(data).map((item: keyof statsFrame, id) => (
                <div className='tagStats' key={Math.random()}>
                    <div className='tagStatsTag'>{lablesArray[id]}</div>
                    <div className='tagStatsValue'>{data[item]}</div>
                </div>
            ))}
        </div>
    );
}
export default LoadStats;