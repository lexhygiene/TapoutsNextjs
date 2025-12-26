import React from 'react';

const BrandName: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <span className={`italic lowercase ${className}`} style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}>
            tapouts
        </span>
    );
};

export default BrandName;
