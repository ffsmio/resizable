import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Container } from './container';
import { BasicDemo } from './basic';
import { Hero } from './hero';
import { Features } from './features';
import { Wrapper } from './wrapper';
import { DemosClient } from './demos-client';
import { TestCases } from './testcases';

export default function HomeContainer() {
  return (
    <Container>
      <Wrapper>
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <Hero />

        {/* Demo Section */}
        <BasicDemo />

        {/* Features Section */}
        <Features />

        {/* Advanced Demos Section */}
        <DemosClient />

        {/* Test Cases Section */}
        <TestCases />

        {/* Footer */}
        <Footer />
      </Wrapper>
    </Container>
  );
}

export { metadata } from './metadata';
