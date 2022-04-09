import Sample from 'components/Sample';
import type { NextPage } from 'next';
import tw from 'tailwind-styled-components';

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Text>TailWind Styled Init</Text>
      <Text>AWS Deploy</Text>
      <Sample />
    </Wrapper>
  );
};

export default Home;

const Wrapper = tw.div`
  flex
  flex-col
  justify-center
  items-center
  space-y-5
  h-full
  bg-slate-300
  text-black
  selection:bg-transparent
`;

const Text = tw.p`
  font-bold
  font-mono
  text-xl
  cursor-default
`;
