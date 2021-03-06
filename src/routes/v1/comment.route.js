/*
  DEMOS
  Copyright (C) 2022 Julian Alejandro Ortega Zepeda, Erik Ivanov Domínguez Rivera, Luis Ángel Meza Acosta
  This file is part of DEMOS.

  DEMOS is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  DEMOS is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const express = require('express');
const auth = require('../../shared/middlewares/auth');
const validate = require('../../shared/middlewares/validate');
const validations = require('../../validations/comment.validation');
const router = express.Router();
const commentController = require('../../controllers/comment.controller');
const spaceMember = require('../../shared/middlewares/space-member.middleware');
const isSubComment = require('../../middlewares/is-sub-comment.middleware');
const deleteComment = require('../../shared/middlewares/delete-comment.middleware');
const canModifyComment = require('../../middlewares/can-modify-comment.middleware')

router.get(
  '/:spaceId/:manifestoCommentId', 
  auth(), 
  spaceMember, 
  commentController.getComment
);

router.post(
  '/:spaceId/:manifestoId',
  auth(),
  validate(validations.comment),
  spaceMember,
  commentController.createComment
);

router.post(
  '/:spaceId/:manifestoId/:manifestoCommentParentId',
  auth(),
  validate(validations.comment),
  spaceMember,
  isSubComment,
  commentController.createComment
);

router.delete(
  '/:spaceId/:manifestoCommentId',
  auth(),
  spaceMember,
  deleteComment,
  commentController.deleteComment
);

router.put(
  '/:spaceId/:manifestoCommentId',
  auth(),
  validate(validations.comment),
  spaceMember,
  canModifyComment,
  commentController.updateComment
);

module.exports = router;
