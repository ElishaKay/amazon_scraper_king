import Layout from '../components/Layout';
import Link from 'next/link';
import '../components/blog/BlogPage.css';
import HowItWorks from '../components/tutorials/HowItWorks';

const GettingStarted = () => {
    return (
        <Layout>
            <HowItWorks />
        </Layout>
    );
};

export default GettingStarted;
