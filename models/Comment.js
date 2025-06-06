const { Schema, models, model } = require("mongoose");

const CommentSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String  },
    title: [{ type: String }],
    contentpera: { type: String },
    maincomment: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true, index: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment', index: true },
    children: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Properly defining it as an array
    parentName: { type: String  }
});


export const Comment = models.Comment || model("Comment", CommentSchema, "comments");
