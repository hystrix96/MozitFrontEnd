// import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// export default function FAQ() {
//   const [expanded, setExpanded] = React.useState([]);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(
//       isExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel),
//     );
//   };

//   return (
//     <Box 
//         sx={{
//             display: 'flex',
//             flexDirection: 'column',  // 수직 방향으로 배치
//             alignItems: 'center',
//             justifyContent: 'flex-start', // 상단 정렬
//             minHeight: 'calc(100vh - 64px)', // AppBar를 제외한 전체 높이
//             padding: 4,
//             marginTop: '64px', // AppBar를 위한 상단 여백
//         }}
//     >
//       <Box sx={{
//           maxWidth: 1000,
//           width: '100%',
//           }}
//       >
//         <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
//           Frequently Asked Questions
//         </Typography>
//         <Box sx={{ width: '100%' }}>
//           <Accordion
//             expanded={expanded.includes('panel1')}
//             onChange={handleChange('panel1')}
//           >
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel1d-content"
//               id="panel1d-header"
//             >
//               <Typography component="span" variant="subtitle2">
//                 How do I contact customer support if I have a question or issue?
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography
//                 variant="body2"
//                 gutterBottom
//                 sx={{ maxWidth: { sm: '100%', md: '70%' } }}
//               >
//                 You can reach our customer support team by emailing&nbsp;
//                 <Link href="mailto:support@email.com">support@email.com</Link>
//                 &nbsp;or calling our toll-free number. We&apos;re here to assist you
//                 promptly.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//           <Accordion
//             expanded={expanded.includes('panel2')}
//             onChange={handleChange('panel2')}
//           >
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel2d-content"
//               id="panel2d-header"
//             >
//               <Typography component="span" variant="subtitle2">
//                 Can I return the product if it doesn&apos;t meet my expectations?
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography
//                 variant="body2"
//                 gutterBottom
//                 sx={{ maxWidth: { sm: '100%', md: '70%' } }}
//               >
//                 Absolutely! We offer a hassle-free return policy. If you&apos;re not
//                 completely satisfied, you can return the product within [number of
//                 days] days for a full refund or exchange.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//           <Accordion
//             expanded={expanded.includes('panel3')}
//             onChange={handleChange('panel3')}
//           >
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel3d-content"
//               id="panel3d-header"
//             >
//               <Typography component="span" variant="subtitle2">
//                 What makes your product stand out from others in the market?
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography
//                 variant="body2"
//                 gutterBottom
//                 sx={{ maxWidth: { sm: '100%', md: '70%' } }}
//               >
//                 Our product distinguishes itself through its adaptability, durability,
//                 and innovative features. We prioritize user satisfaction and
//                 continually strive to exceed expectations in every aspect.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//           <Accordion
//             expanded={expanded.includes('panel4')}
//             onChange={handleChange('panel4')}
//           >
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel4d-content"
//               id="panel4d-header"
//             >
//               <Typography component="span" variant="subtitle2">
//                 Is there a warranty on the product, and what does it cover?
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography
//                 variant="body2"
//                 gutterBottom
//                 sx={{ maxWidth: { sm: '100%', md: '70%' } }}
//               >
//                 Yes, our product comes with a [length of warranty] warranty. It covers
//                 defects in materials and workmanship. If you encounter any issues
//                 covered by the warranty, please contact our customer support for
//                 assistance.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//         </Box>
//       </Box>
//     </Box>
//   );
// }
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('general'); // 카테고리 선택 상태

  // 카테고리별 FAQ 데이터
  const faqData = {
    general: [
      {
        question: 'Test용',
        answer: (
          <>
            잘 들어가고 있는건가요?
          </>
        ),
      },
    ],
    returns: [
      {
        question: 'Test용',
        answer: (
          <>
            잘 들어가고 있는건가요?
          </>
        ),
      },
    ],
    product: [
      {
        question: 'Test용',
        answer: (
          <>
            잘 들어가고 있는건가요?
          </>
        ),
      },
    ],
    warranty: [
      {
        question: 'Is there a warranty on the product, and what does it cover?',
        answer: 'Yes, our product comes with a [length of warranty] warranty. It covers defects in materials and workmanship. If you encounter any issues covered by the warranty, please contact our customer support for assistance.',
      },
    ],
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 'calc(100vh - 64px)', // AppBar를 제외한 전체 높이
        padding: 4,
        marginTop: '64px', // AppBar를 위한 상단 여백
      }}
    >
      <Box sx={{ maxWidth: 1000, width: '100%' }}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
          Frequently Asked Questions
        </Typography>

        {/* 카테고리 선택 버튼들 */}
        <Box sx={{ marginBottom: 2, display :'flex', justifyContent: 'center' }}>
          <Button variant={selectedCategory === 'general' ? 'contained' : 'outlined'} onClick={() => setSelectedCategory('general')}>
            결제
          </Button>
          <Button variant={selectedCategory === 'returns' ? 'contained' : 'outlined'} sx={{ marginLeft: 2 }} onClick={() => setSelectedCategory('returns')}>
            제품
          </Button>
          <Button variant={selectedCategory === 'product' ? 'contained' : 'outlined'} sx={{ marginLeft: 2 }} onClick={() => setSelectedCategory('product')}>
            주요 질문
          </Button>
          <Button variant={selectedCategory === 'warranty' ? 'contained' : 'outlined'} sx={{ marginLeft: 2 }} onClick={() => setSelectedCategory('warranty')}>
            Warranty
          </Button>
        </Box>

        {/* 선택된 카테고리에 따라 내용 표시 */}
        <Box sx={{ width: '100%' }}>
          {faqData[selectedCategory].map((faq, index) => (
            <Accordion key={index} expanded={expanded.includes(`panel${index}`)} onChange={handleChange(`panel${index}`)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                <Typography component="span" variant="subtitle2">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" gutterBottom sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
