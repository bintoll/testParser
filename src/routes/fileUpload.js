import express from 'express'
const router = express.Router();

/* GET home page. */
router.post('/', (req, res) => {
  const db = req.db;
  const taskCollection = db.get('taskCollection');
  // collection.find({},{},function(e,docs){
  //     res.render('userlist', {
  //         "userlist" : docs
  //     });
  // });
  // if (error) {
  //   console.log(error);
  //   res.json({ status: false });
  // } else {
  //   console.log('Message sent: ' + info.response);
  // }
  const { text } = req.body
  console.log(text.length)
  let parse = {
    start: null,
    end: null
  }
  const splited = text.split('\n')
  console.log(splited.length)
  let allArr = []
  let props = []
  splited.forEach((item, index) => {
    const row = item.split('\t')
    if (row[0] == '%T' && row[1] == 'TASK\r' && !parse.end) {
      console.log('parsing starts form ' + index)
      parse = {
        start: index,
        end: null
      }
    }
    if (row[0] == '%T' && row[1] == 'PROJCOST\r') {
      console.log('parsing ends at ' + index)
      parse.end = index
    }
    if (parse.start && index > parse.start && (index < parse.end || parse.end == null)) {
      let obj = {};
      if (index == parse.start + 1) {
        row.forEach((item, i) => { 
          if (i >= 1) {
            props.push(item.replace('\r', ''))
          }
        })
      } else {
        props.forEach((prop, i) => {
          obj[prop] = row[i + 1].replace('\r', '')
        })
      }
      Object.keys(obj).length != 0 && allArr.push(obj)
    }
  })
  console.log(allArr.length)
  taskCollection.insert(allArr, (err, doc) => {
        if (err) {
          console.log(error);
          res.json({ status: false });
        }
        else {
          res.json({ status: true, data: doc.map(item => { return { id: item.task_id, name: item.task_name, early_start_date: item.early_start_date, early_end_date: item.early_end_date } })});
        }
  });
});

export default router
